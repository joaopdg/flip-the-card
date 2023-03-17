import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Original list with all the students
  let studentsList = [
    "Alexandre A.",
    "André L.",
    "Assebe K.",
    "Caio M.",
    "Caroline K.",
    "Duarte F.",
    "Déborah L.",
    "Erika G.",
    "Eveline C.",
    "Farid C.",
    "Francisco P.",
    "Gabriel G.",
    "Joana G.",
    "José L.",
    "João C.",
    "João R.",
    "Maria C.",
    "Mariana F.",
    "Marisha D.",
    "Miguel J.",
    "Paulo C.",
    "Pedro L.",
    "Rafaela U.",
    "Tiago R.",
    "Tomás B.",
    "Vanessa V.",
  ];

  // Array of already picked students
  const [pickedStudents, setPickedStudents] = useState([]);
  // Array of students waiting to be pick (select dropdown)
  const [queue, setQueue] = useState([...studentsList]);
  // Array of pairs already assigned (results box)
  const [studentPairs, setStudentPairs] = useState([]);
  // Will be used later to save the select dropdown e.target
  const [selectTarget, setSelectTarget] = useState(null);

  // Get half of the cards
  const numOfCards = studentsList.length / 2;

  // Add picking student to the pickedStudents array
  const selectStudent = (e) => {
    if (e.target.value !== "default") {
      let picking = e.target.value;
      setPickedStudents([picking, ...pickedStudents]);
    }
  };

  // Assign a random person to the picking student
  const pickFunction = (e) => {
    let randomStudent;
    if (
      !e.target.classList.contains("flippedCard") &&
      selectTarget !== "default" &&
      selectTarget !== pickedStudents[1]
    ) {
      do {
        randomStudent = queue[Math.floor(Math.random() * queue.length)];
      } while (pickedStudents.includes(randomStudent));

      // Update the array of already picked students
      setPickedStudents([randomStudent, ...pickedStudents]);

      // Flip the card
      e.target.classList.add("flippedCard");
      e.target.textContent = randomStudent;

      // Remove already assigned students from the select dropdown
      let remaining = studentsList.filter(
        (student) => !pickedStudents.includes(student)
      );
      setQueue(remaining);

      // Reset select dropdown to default after pair is assigned
      setSelectTarget("default")
    }
  };

  // Keep track of pairs already assigned
  useEffect(() => {
    if (
      pickedStudents.length > 1 &&
      pickedStudents.length % 2 === 0 &&
      pickedStudents[0] !== pickedStudents[1]
    ) {
      setStudentPairs([
        ...studentPairs,
        `${pickedStudents[1]} 🤝 ${pickedStudents[0]}`,
      ]);
    }
  }, [pickedStudents]);

  return (
    <>
      {/* BACKGROUND ANIMATION */}
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        {/* IRONHACK LOGO */}
        <div className="pickingStudent">
          <img src="ironhackLogo.png" alt="ironhack logo" />

          {/* SELECT DROPDOWN TO CHOOSE THE PICKING STUDENT */}
          <select
            id="selectStudents"
            className="classic"
            onChange={(e) => {
              selectStudent(e);
              setSelectTarget(e.target.value);
            }}
          >
            <option key="default" value="default">
              Select your name
            </option>
            {queue.map((student, index) => {
              return (
                <option key={Math.floor(Math.random() * 123132312)} value={student}>
                  {student}
                </option>
              );
            })}
          </select>

          {/* ALERT MESSAGE IF STUDENT ALREADY HAS A PAIR */}
          {pickedStudents.length > 1 &&
          pickedStudents[0] === pickedStudents[1] ? (
            <p id="selectAlert">Student already picked!</p>
          ) : (
            <p></p>
          )}
        </div>

        {/* ALL CARDS WITH STUDENTS NAMES */}
        <div className={"resultsAndCards"}>
          <div className="allCards">
            {studentsList.slice(0, numOfCards).map((student, index) => {
              return (
                <div
                  key={index}
                  className="card"
                  onClick={(e) => pickFunction(e)}
                ></div>
              );
            })}
          </div>

          {/* BOX WITH STUDENT PAIRS ALREADY ASSIGNED */}
          <div className="resultsBox">
            <p>Pairs:</p>
            <ul id={"results"}>
              {studentPairs.map((pair, index) => {
                return <li key={index}>{pair}</li>;
              })}
            </ul>
          </div>
        </div>

        {/* CONSOLE LOGS FOR TESTING - COMMENT BEFORE DEPLOY */}
        {/* <button
          onClick={() => {
            console.log(`-----------------------`);
            console.log(
              `Picked Students ${pickedStudents.length}  >>>  ${pickedStudents}`
            );
            console.log(
              `Remaining Students ${studentsList.length}  >>>  ${studentsList}`
            );
            console.log(`Students in queue ${queue.length}  >>>  ${queue}`);
          }}
        >
          console
        </button> */}
      </div>
    </>
  );
}

export default App;
