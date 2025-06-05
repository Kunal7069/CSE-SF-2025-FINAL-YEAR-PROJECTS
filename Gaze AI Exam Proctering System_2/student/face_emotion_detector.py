import numpy as np
from keras.layers import Conv2D, Input, BatchNormalization, MaxPooling2D, Activation, Flatten, Dense, Dropout
from keras.models import Model
from keras.preprocessing import image
import cv2
import mediapipe as mp
from gaze_detector import GazeDetector
import dlib
import argparse

class EmotionRecognitionModel:
    def __init__(self, input_shape):
        self.model = self._build_model(input_shape)
        self.model.load_weights('models\image\model_weights.hdf5')
        self.face_cascade = cv2.CascadeClassifier('models/image//haarcascade_frontalface_default.xml')
        self.label_dict = {0: 'Angry', 1: 'Disgusting', 2: 'Fear', 3: 'Happy', 4: 'Sad', 5: 'Surprise', 6: 'Neutral'}
        self.gaze_detector = GazeDetector()

    def _build_model(self, input_shape):
        X_input = Input((48,48,1))

        X = Conv2D(32, kernel_size=(3,3), strides=(1,1), padding='valid')(X_input)
        X = BatchNormalization(axis=3)(X)
        X = Activation('relu')(X)


        X = Conv2D(64, (3,3), strides=(1,1), padding = 'same')(X)
        X = BatchNormalization(axis=3)(X)
        X = Activation('relu')(X)

        X = MaxPooling2D((2,2))(X)

        X = Conv2D(64, (3,3), strides=(1,1), padding = 'valid')(X)
        X = BatchNormalization(axis=3)(X)
        X = Activation('relu')(X)

        X = Conv2D(128, (3,3), strides=(1,1), padding = 'same')(X)
        X = BatchNormalization(axis=3)(X)
        X = Activation('relu')(X)


        X = MaxPooling2D((2,2))(X)

        X = Conv2D(128, (3,3), strides=(1,1), padding = 'valid')(X)
        X = BatchNormalization(axis=3)(X)
        X = Activation('relu')(X)

        

        X = MaxPooling2D((2,2))(X)
        X = Flatten()(X)
        X = Dense(200, activation='relu')(X)
        X = Dropout(0.6)(X)
        X = Dense(7, activation = 'softmax')(X)

        model = Model(inputs=X_input, outputs=X)
        return model

    def detect_emotion_in_frame(self, cap_image):
        cap_img_gray = cv2.cvtColor(cap_image, cv2.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(cap_img_gray, 1.3, 5)
        emotion_predictions = []
        gaze_direction = "No face detected"

        if len(faces) == 0:
            return cap_image, "", gaze_direction

        processed_frame, gaze_direction = self.gaze_detector.detect_gaze(cap_image)

        for (x, y, w, h) in faces:
            cv2.rectangle(processed_frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            roi_gray = cap_img_gray[y:y + h, x:x + w]
            roi_gray = cv2.resize(roi_gray, (48, 48))
            img_pixels = image.img_to_array(roi_gray)
            img_pixels = np.expand_dims(img_pixels, axis=0)

            predictions = self.model.predict(img_pixels)
            emotion_label = np.argmax(predictions)
            emotion_prediction = self.label_dict[emotion_label]
            emotion_predictions.append(emotion_prediction)

            cv2.putText(processed_frame, emotion_prediction, (int(x), int(y-10)), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
            
            cv2.putText(processed_frame, f"Gaze: {gaze_direction}", (int(x), int(y+h+25)), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        return processed_frame, emotion_prediction, gaze_direction
    



# Importing required packages
from keras.models import load_model
import numpy as np
import argparse
import dlib
import cv2


emotion_offsets = (20, 40)
emotions = {
    0: {
        "emotion": "Angry",
        "color": (193, 69, 42)
    },
    1: {
        "emotion": "Disgust",
        "color": (164, 175, 49)
    },
    2: {
        "emotion": "Fear",
        "color": (40, 52, 155)
    },
    3: {
        "emotion": "Happy",
        "color": (23, 164, 28)
    },
    4: {
        "emotion": "Sad",
        "color": (164, 93, 23)
    },
    5: {
        "emotion": "Suprise",
        "color": (218, 229, 97)
    },
    6: {
        "emotion": "Neutral",
        "color": (108, 72, 200)
    }
}


def shapePoints(shape):
    coords = np.zeros((68, 2), dtype="int")
    for i in range(0, 68):
        coords[i] = (shape.part(i).x, shape.part(i).y)
    return coords


def rectPoints(rect):
    x = rect.left()
    y = rect.top()
    w = rect.right() - x
    h = rect.bottom() - y
    return (x, y, w, h)


faceLandmarks = "models/shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(faceLandmarks)

emotionModelPath = 'models/emotionModel.hdf5'  # fer2013_mini_XCEPTION.110-0.65
emotionClassifier = load_model(emotionModelPath, compile=False)
emotionTargetSize = emotionClassifier.input_shape[1:3]

# Create a global gaze detector instance
gaze_detector = GazeDetector()

def identify_emotion(frame):
    frame = cv2.resize(frame, (720, 480))
    detected_emotion = ""
    gaze_direction = "CENTER"  # Default gaze direction

    try:
        # Use the global gaze detector
        frame, gaze_direction = gaze_detector.detect_gaze(frame)
    except Exception as e:
        print(f"Gaze detection error: {e}")
        # Continue with emotion detection even if gaze detection fails
    
    try:
        grayFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = detector(grayFrame, 0)
        
        for rect in rects:
            (x, y, w, h) = rectPoints(rect)
            color = (255, 255, 255)
            cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
            
            # Add gaze direction text
            cv2.putText(frame, f"Gaze: {gaze_direction}", (x, y + h + 25),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            # Add emotion detection logic here if needed
            detected_emotion = "Neutral"  # Default emotion or add your emotion detection logic
            
    except Exception as e:
        print(f"Face detection error: {e}")
        
    return frame, detected_emotion, gaze_direction

class ProctorSystem:
    def __init__(self):
        self.gaze_detector = GazeDetector()
        self.violation_count = 0
        self.last_violations = []
        self.max_violations = 5
        self.face_absent_count = 0
        self.max_face_absent = 3
        
    def check_proctoring_violations(self, gaze_direction, face_detected):
        violation = False
        violation_type = "No Violation"
        
        # Check if face is present
        if not face_detected:
            self.face_absent_count += 1
            if self.face_absent_count >= self.max_face_absent:
                violation = True
                violation_type = "Face not detected in frame"
                self.violation_count += 1
        else:
            self.face_absent_count = 0
        
        # Check gaze direction
        if gaze_direction in ["LEFT", "RIGHT"]:
            self.last_violations.append(gaze_direction)
            if len(self.last_violations) > 10:
                self.last_violations.pop(0)
                
            consecutive_violations = 0
            for direction in reversed(self.last_violations):
                if direction == gaze_direction:
                    consecutive_violations += 1
                else:
                    break
                    
            if consecutive_violations >= 3:
                violation = True
                violation_type = f"Suspicious gaze activity: Looking {gaze_direction.lower()} repeatedly"
                self.violation_count += 1
        
        return violation, violation_type

    def analyze_frame(self, frame):
        frame = cv2.resize(frame, (720, 480))
        
        try:
            # Detect gaze
            frame, gaze_direction = self.gaze_detector.detect_gaze(frame)
            face_detected = gaze_direction != "Face not detected"
            
            # Check for violations
            violation, violation_type = self.check_proctoring_violations(gaze_direction, face_detected)
            
            # Add warning text
            if violation:
                warning_text = "WARNING: Suspicious Activity Detected"
                cv2.putText(frame, warning_text, (10, 30),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                           
            # Add violation count and status
            cv2.putText(frame, f"Violations: {self.violation_count}", (10, 60),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
            return frame, gaze_direction, violation, violation_type
            
        except Exception as e:
            print(f"Proctoring error: {e}")
            return frame, "UNKNOWN", False, "Processing Error"

# Create global proctor instance
proctor_system = ProctorSystem()

def identify_proctoring(frame):
    """Main function called by views"""
    return proctor_system.analyze_frame(frame)
 