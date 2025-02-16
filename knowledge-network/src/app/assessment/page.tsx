// src/app/assessment/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AssessmentPage() {
  const assessments = [
    {
      id: '1',
      title: 'Data Structures Weekly Assessment',
      dueDate: '2025-02-22',
      status: 'pending',
      course: 'CS201'
    },
    {
      id: '2',
      title: 'Physics Midterm',
      dueDate: '2025-02-25',
      status: 'upcoming',
      course: 'PHY101'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assessments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardHeader>
              <CardTitle>{assessment.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Course</span>
                  <span>{assessment.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Due Date</span>
                  <span>{new Date(assessment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    assessment.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {assessment.status}
                  </span>
                </div>
                <button className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Start Assessment
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}