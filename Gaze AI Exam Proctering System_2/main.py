import cv2
from gaze_detector import GazeDetector

def main():
    # Initialize camera
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    
    # Initialize gaze detector
    gaze_detector = GazeDetector()
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Process frame
        frame, gaze_direction = gaze_detector.detect_gaze(frame)
        
        # Display gaze direction
        cv2.putText(frame, f"Gaze: {gaze_direction}", (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        # Show frame
        cv2.imshow("Gaze Detection", frame)
        
        # Break loop on 'q' press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main() 