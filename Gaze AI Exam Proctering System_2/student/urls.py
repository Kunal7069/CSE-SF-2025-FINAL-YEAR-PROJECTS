from django.urls import path
from student import views
from django.contrib.auth.views import LoginView
from exam.views import custom_logout_view

urlpatterns = [
path('studentclick', views.studentclick_view),
path('logout', custom_logout_view, name='logout'),
path('studentlogin', LoginView.as_view(template_name='student/studentlogin.html'),name='studentlogin'),
path('studentsignup', views.student_signup_view,name='studentsignup'),
path('student-dashboard', views.student_dashboard_view,name='student-dashboard'),
path('student-exam', views.student_exam_view,name='student-exam'),
path('student-blog', views.student_blog_view,name='student-blog'),
path('student-material', views.student_material_view,name='student-material'),
path('download_pdf_file/<str:filename>', views.download_pdf_file,name='download_pdf_file'),
path('take-exam/<int:pk>', views.take_exam_view,name='take-exam'),
path('start-exam/<int:pk>', views.start_exam_view,name='start-exam'),
path('calculate-marks', views.calculate_marks_view,name='calculate-marks'),
path('view-result', views.view_result_view,name='view-result'),
path('check-marks/<int:pk>', views.check_marks_view,name='check-marks'),
path('student-marks', views.student_marks_view,name='student-marks'),
path('ask/<str:message>', views.chat_msg,name='ask'),
    path('process-emotion/', views.process_emotion, name='process-emotion'),

]
