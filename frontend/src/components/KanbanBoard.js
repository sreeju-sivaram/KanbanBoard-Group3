import React, { useCallback, useEffect, useState,useContext } from "react";
import Board from "./Board";
import CustomInput from "./CustomInput";
import { addNewStatus, addNewTask, deleteTask, getStatusData, getTasksData, updateTaskDetails, getProjectRole} from '../api/api';
import AuthContext from "../context/AuthProvider";

const KanbanBoard = () => {
const [boards, setBoards] = useState([]);
const [tasks, setTasks] = useState([]);
const [projectRole, setProjectRole] = useState([]);
const [refetchData, setRefetchData] = useState(true);
const { auth } = useContext(AuthContext);

const fetchData = useCallback(
  async () => {
    const tasksResponse = await getTasksData(auth.data.projectId)
    const statusResponse = await getStatusData()
    const roleResponse = await getProjectRole(auth.data.id,auth.data.projectId);
    setTasks(tasksResponse);
    setBoards(statusResponse);
    setProjectRole(roleResponse);
    setRefetchData(false);
  },
  [setTasks, setBoards, setProjectRole, auth],
);

useEffect(
  () => {
    refetchData && fetchData();
  },
  [fetchData, refetchData]
);

const [targetCard, setTargetCard] = useState({
  boardId: 0,
  cardId: 0,
});

const addboardHandler = 
useCallback(
  async (inputText) => {
    const response = await addNewStatus({ name: inputText })
    if (response.data.status === 'success') {
      setRefetchData(true)
    }
  },
  [setRefetchData]
);

const removeBoard = (boardId) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  tempBoardsList.splice(boardIndex, 1);
  setBoards(tempBoardsList);
};

const addTaskHandler = 
useCallback(
  async (boardId, values) => {
    const { inputText, description } = values
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;
    const newTask = {
      id: tasks.length + 1,
      project_id: auth.data.projectId,
      name: inputText,
      status_id: boardId,
      priority_id: 3,
      date: Date.now(),
      description: description,
    }
    const response = await addNewTask(newTask)
    if (response.data.status === 'success') {
      setRefetchData(true)
    }
  },
  [boards, tasks, setRefetchData, auth]
);

const removeCard = useCallback( async (taskId) => {
    const response = await deleteTask(taskId)
    if (response.status === 'success') {
      setRefetchData(true)
    }
  },
  [setRefetchData]
);

const updateCard = useCallback(
  async (taskId, cardValues) => {
    const response = await updateTaskDetails(taskId, cardValues)
    if (response === 'success') {
      setRefetchData(true);
      return response
    }
  },
  [setRefetchData],
);

const onDragEnd = (boardId, cardId) => {
  const sourceBoardIndex = boards.findIndex(
    (item) => item.id === boardId,
  );
  if (sourceBoardIndex < 0) return;

  const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
    (item) => item.id === cardId,
  );
  if (sourceCardIndex < 0) return;

  const targetBoardIndex = boards.findIndex(
    (item) => item.id === targetCard.boardId,
  );
  if (targetBoardIndex < 0) return;

  const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
    (item) => item.id === targetCard.cardId,
  );
  if (targetCardIndex < 0) return;

  const tempBoardsList = [...boards];
  const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
  tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
  tempBoardsList[targetBoardIndex].cards.splice(
    targetCardIndex,
    0,
    sourceCard,
  );
  setBoards(tempBoardsList);

  setTargetCard({
    boardId: 0,
    cardId: 0,
  });
};

const onDragEnter = (boardId, cardId) => {
  if (targetCard.cardId === cardId) return;
  setTargetCard({
    boardId: boardId,
    cardId: cardId,
  });
};

return (
  <div className="app">
      <div className="app-nav">
          <h1>Kanban Board</h1>
      </div>
      <div className="app-boards-container">
      <div className="app-boards">
        {boards.map((item) => (
          <Board
            key={item.id}
            board={item}
            addTask={addTaskHandler}
            removeBoard={() => removeBoard(item.id)}
            removeCard={removeCard}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            updateCard={updateCard}
            tasks={tasks}
            projectRole={projectRole}
          />
          ))}
          <div className="app-boards-last">
          <CustomInput
            displayClass="app-boards-add-board"
            editClass="app-boards-add-board-edit"
            placeholder="Enter Board Name"
            text="Add Board"
            buttonText="Add"
            onSubmit={addboardHandler}
          />
          </div>
      </div>
      </div>
  </div>
);
};

export default KanbanBoard;