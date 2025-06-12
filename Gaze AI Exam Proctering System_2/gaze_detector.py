import cv2
import mediapipe as mp
import numpy as np

class GazeDetector:
    def __init__(self):
        # Initialize MediaPipe Face Mesh
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        # Landmark indices for eyes
        self.LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
        self.RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
        
        # Landmark indices for iris
        self.LEFT_IRIS = [474, 475, 476, 477]
        self.RIGHT_IRIS = [469, 470, 471, 472]

    def _get_iris_position(self, iris_center, eye_points):
        """Calculate relative iris position within the eye"""
        eye_center = np.mean(eye_points, axis=0)
        iris_x, _ = iris_center
        eye_left = np.min(eye_points[:, 0])
        eye_right = np.max(eye_points[:, 0])
        
        # Calculate relative position (0 to 1)
        relative_position = (iris_x - eye_left) / (eye_right - eye_left)
        
        if relative_position <= 0.42:
            return "LEFT"
        elif relative_position >= 0.57:
            return "RIGHT"
        else:
            return "CENTER"

    def detect_gaze(self, frame):
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(frame_rgb)
        
        if not results.multi_face_landmarks:
            return frame, "Face not detected"
        
        mesh_points = np.array([
            np.multiply([p.x, p.y], [frame.shape[1], frame.shape[0]]).astype(int)
            for p in results.multi_face_landmarks[0].landmark
        ])
        
        # Get eye and iris points
        left_eye = mesh_points[self.LEFT_EYE]
        right_eye = mesh_points[self.RIGHT_EYE]
        left_iris = mesh_points[self.LEFT_IRIS]
        right_iris = mesh_points[self.RIGHT_IRIS]
        
        # Calculate iris centers
        left_iris_center = np.mean(left_iris, axis=0).astype(int)
        right_iris_center = np.mean(right_iris, axis=0).astype(int)
        
        # Determine gaze direction for each eye
        left_gaze = self._get_iris_position(left_iris_center, left_eye)
        right_gaze = self._get_iris_position(right_iris_center, right_eye)
        
        # Visualize
        cv2.polylines(frame, [left_eye], True, (0, 255, 0), 1)
        cv2.polylines(frame, [right_eye], True, (0, 255, 0), 1)
        cv2.circle(frame, left_iris_center, 2, (0, 0, 255), -1)
        cv2.circle(frame, right_iris_center, 2, (0, 0, 255), -1)
        
        # Determine overall gaze direction
        if left_gaze == right_gaze:
            gaze_direction = left_gaze
        else:
            gaze_direction = "MIXED"
            
        return frame, gaze_direction 