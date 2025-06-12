# Cardiovascular Detection using ECG Images

## Overview

The Cardiovascular Detection using ECG Images project is an advanced automated solution designed to identify cardiac anomalies by analyzing 12-lead ECG images. Developed as part of a Bachelor of Technology (B.Tech) project at the Institute of Engineering & Technology, Lucknow, this initiative leverages machine learning to classify ECG images into four categories: Normal, Myocardial Infarction (MI), Abnormal Heartbeat (AHB), and History of Myocardial Infarction (PMI). The system achieves an impressive accuracy of 92.5% using an ensemble voting classifier, incorporating preprocessing, time-domain feature extraction, and Principal Component Analysis (PCA) for dimensionality reduction. Deployed as a Streamlit-based web application, it offers real-time predictions and is accessible globally, particularly benefiting resource-limited settings. The project also lays the foundation for future enhancements, including the detection of Atrial Fibrillation (AF) and sleep apnea using the 13th lead.

## Project Structure

- **Deployment/**: Contains essential files for deployment on Render.
  - `Dockerfile`: Defines the Docker configuration for containerization.
  - `Ecg.py`: Implements the core logic for ECG image processing and prediction.
  - `final_app.py`: Serves as the main Streamlit application script.
  - `requirements.txt`: Lists all Python dependencies required to run the app.
- **Trained_Model/**: Stores trained model files managed via Git LFS.
  - `Heart_Disease_Prediction_using_ECG (4).pkl`: The trained ensemble model for ECG classification.
  - `PCA_ECG (1).pkl`: The pre-trained PCA model for dimensionality reduction.

## Training Data

The model was trained on a dataset comprising 929 ECG images obtained from the Mendeley Data Repository, accessible at [https://data.mendeley.com/datasets/7dybx7wyfn/3](https://data.mendeley.com/datasets/7dybx7wyfn/3). Accessed in December 2024, this dataset includes 12-lead ECG images categorized as follows: Normal (284 images), Abnormal Heartbeat (233 images), Myocardial Infarction (240 images), and History of Myocardial Infarction (172 images), totaling 11,148 leads. The images were preprocessed to extract 3060 features per image, subsequently reduced to 400 components using PCA, ensuring high classification accuracy and computational efficiency.

## Current Deployment Status

The application is successfully deployed on Render and is accessible via the web at [https://anahata-ai.onrender.com](https://anahata-ai.onrender.com). Utilizing Docker for scalability and reliability, the deployment supports real-time ECG image uploads, processing them through the trained ensemble model to deliver diagnostic results (MI, Normal, PMI, AHB) with 92.5% accuracy. The system is operational as of June 2025, providing a user-friendly interface for cardiologists and patients to perform cardiac screening efficiently.

## Acknowledgements

We extend our heartfelt gratitude to the Institute of Engineering & Technology, Lucknow, for providing the academic platform and resources to complete this project. Special thanks to our supervisors for their invaluable guidance. We also acknowledge the support from our peers, the Department of Computer Science and Engineering, and the Mendeley Data Repository for the dataset. This project marks the successful completion of our Bachelor of Technology degree in Computer Science & Engineering (Self Finance, 2021-2025), a milestone achieved through dedication and collaboration.
