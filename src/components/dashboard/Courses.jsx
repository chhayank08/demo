import React, { useState } from 'react';
import { Plus, Play, Users, Clock, Video } from 'lucide-react';
import AddCourseModal from '../modals/AddCourseModal';
import { toast } from 'react-hot-toast';

const initialCourses = [
  {
    id: 1,
    title: 'Complete React Development',
    description: 'Learn React from basics to advanced concepts',
    students: 145,
    duration: '12 hours',
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming',
    students: 89,
    duration: '8 hours',
    status: 'draft',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'CSS Grid & Flexbox',
    description: 'Modern CSS layout techniques',
    students: 67,
    duration: '6 hours',
    status: 'published',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
  }
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCourse = (newCourseData) => {
    const newCourse = {
      id: courses.length + 1,
      ...newCourseData,
      students: 0,
      duration: '0 hours',
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=200&fit=crop'
    };
    setCourses(prevCourses => [newCourse, ...prevCourses]);
    toast.success('Course created successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Courses & Programs</h2>
          <p className="text-gray-600">Manage your educational content</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                  <Play className="h-6 w-6 text-gray-900" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    course.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {course.status}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 h-10 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
              {course.videoPlatform && (
                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center space-x-2 text-sm text-gray-600">
                  <Video className="h-4 w-4 text-primary-600" />
                  <span className="capitalize">{course.videoPlatform}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default Courses;
