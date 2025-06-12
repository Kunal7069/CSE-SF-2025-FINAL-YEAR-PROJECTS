from django.urls import path
from exam.views import custom_logout_view
from teacher import views
from django.contrib.auth.views import LoginView
from exam.views import custom_logout_view
from django.contrib.auth.decorators import login_required, user_passes_test

urlpatterns = [
path('teacherclick', views.teacherclick_view),
path('logout', custom_logout_view, name='logout'),  # Add this line
path('teacherlogin', LoginView.as_view(template_name='teacher/teacherlogin.html'),name='teacherlogin'),
path('teachersignup', views.teacher_signup_view,name='teachersignup'),
path('teacher-dashboard', views.teacher_dashboard_view,name='teacher-dashboard'),
path('teacher-blog', views.teacher_blog_view,name='teacher-blog'),
path('teacher-exam', views.teacher_exam_view,name='teacher-exam'),
path('teacher-add-blog', views.teacher_add_blog_view,name='teacher-add-blog'),
path('teacher-add-exam', views.teacher_add_exam_view,name='teacher-add-exam'),
path('teacher-view-blog', views.teacher_view_blog_view,name='teacher-view-blog'),
path('teacher-view-exam', views.teacher_view_exam_view,name='teacher-view-exam'),
path('delete-exam/<int:pk>', views.delete_exam_view,name='delete-exam'),
path('delete-blog/<int:pk>', views.delete_blog_view,name='delete-blog'),
path('delete-material/<int:pk>', views.delete_material_view,name='delete-material'),
path('teacher-view-material', views.teacher_view_material_view,name='teacher-view-material'),
path('teacher-material', views.teacher_material_view,name='teacher-material'),
path('teacher-question', views.teacher_question_view,name='teacher-question'),
path('teacher-add-material', views.teacher_add_material_view,name='teacher-add-material'),
path('teacher-add-question', views.teacher_add_question_view,name='teacher-add-question'),
path('teacher-view-question', views.teacher_view_question_view,name='teacher-view-question'),
path('see-question/<int:pk>', views.see_question_view,name='see-question'),
path('remove-question/<int:pk>', views.remove_question_view,name='remove-question'),
]