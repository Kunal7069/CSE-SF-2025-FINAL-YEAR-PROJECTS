import os
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'onlinexam.settings')
django.setup()

from exam.models import Course, Question

def add_course_and_questions(course_data):
    """
    Add a course and its questions to the database
    """
    try:
        # Create or get the course
        course, created = Course.objects.get_or_create(
            course_name=course_data['course_name'],
            defaults={
                'question_number': len(course_data['questions']),
                'total_marks': sum(q['marks'] for q in course_data['questions'])
            }
        )

        if created:
            print(f"Created new course: {course.course_name}")
        else:
            print(f"Using existing course: {course.course_name}")

        # Add questions
        questions_added = 0
        for q_data in course_data['questions']:
            question, q_created = Question.objects.get_or_create(
                course=course,
                question=q_data['question'],
                defaults={
                    'marks': q_data['marks'],
                    'option1': q_data['option1'],
                    'option2': q_data['option2'],
                    'option3': q_data['option3'],
                    'option4': q_data['option4'],
                    'answer': q_data['answer']
                }
            )
            if q_created:
                questions_added += 1

        print(f"Added {questions_added} new questions to {course.course_name}")
        return True

    except Exception as e:
        print(f"Error adding course and questions: {e}")
        return False

def add_questions_from_file(filename):
    """
    Add questions from a JSON file
    """
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
        
        # Access the courses list from the JSON structure
        for course_data in data['courses']:
            add_course_and_questions(course_data)
            
    except Exception as e:
        print(f"Error reading file {filename}: {e}")

def interactive_add_question():
    """
    Interactively add questions through command line
    """
    try:
        # Get or create course
        course_name = input("Enter course name: ")
        
        course_data = {
            "course_name": course_name,
            "questions": []
        }

        while True:
            print("\nAdding new question:")
            question_data = {
                "question": input("Enter question text: "),
                "marks": int(input("Enter marks for this question: ")),
                "option1": input("Enter option 1: "),
                "option2": input("Enter option 2: "),
                "option3": input("Enter option 3: "),
                "option4": input("Enter option 4: ")
            }
            
            print("\nWhich option is correct?")
            print("1) Option 1")
            print("2) Option 2")
            print("3) Option 3")
            print("4) Option 4")
            
            correct_option = int(input("Enter number (1-4): "))
            question_data["answer"] = f"Option{correct_option}"
            
            course_data["questions"].append(question_data)
            
            if input("\nAdd another question? (y/n): ").lower() != 'y':
                break
        
        add_course_and_questions(course_data)
        
    except Exception as e:
        print(f"Error in interactive mode: {e}")

if __name__ == "__main__":
    while True:
        print("\nQuestion Addition Menu:")
        print("1. Add sample questions from JSON file")
        print("2. Add questions interactively")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ")
        
        if choice == '1':
            filename = input("Enter JSON file path (e.g., questions.json): ")
            add_questions_from_file(filename)
            
        elif choice == '2':
            interactive_add_question()
            
        elif choice == '3':
            break
        
        else:
            print("Invalid choice. Please try again.") 