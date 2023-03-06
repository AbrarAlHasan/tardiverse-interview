import React, { useState } from "react";
import EditDetails from "../components/EditDetails";
import "./style.css";
function Index() {
  const jsonList = [
    {
      id: 1,
      name: "Abrar",
      education: "Engineering",
      address: "Tirunelveli",
    },
    {
      id: 2,
      name: "Ajeeth",
      education: "Software",
      address: "Chennai",
    },
    {
      id: 3,
      name: "Prabha",
      education: "marketing",
      address: "Madurai",
    },
    {
      id: 4,
      name: "Hasib",
      education: "English",
      address: "Coimabatore",
    },
  ];
  const [studentList, setStudentList] = useState(jsonList);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (id) => {
    const deletedStudent = studentList.filter((student) => student.id !== id);
    setStudentList(deletedStudent);
  };
  const handleEdit = (list) => {
    setSelectedStudent(list);
  };
  const handleSave = (studentUpdatedDetails) => {
    const updatedStudents = studentList?.map((student) =>
      student.id == studentUpdatedDetails.id ? studentUpdatedDetails : student
    );
    setStudentList(updatedStudents);
    setSelectedStudent(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>education</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {studentList?.map((list) => {
            return (
              <tr key={list?.id}>
                <td>{list?.name}</td>
                <td>{list?.education}</td>
                <td>{list?.address}</td>
                <td>
                  <button onClick={() => handleEdit(list)}>Edit</button>
                  <button onClick={() => handleDelete(list?.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedStudent && (
        <EditDetails
          selectedStudent={selectedStudent}
          handleSave={handleSave}
        />
      )}
    </>
  );
}

export default Index;
