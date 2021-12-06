import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "components/Text";
import * as S from "./style";
import { useForm } from 'react-hook-form'
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("tasks") == null) localStorage.setItem("tasks", JSON.stringify([]));
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, [])



  let submit = (data, e) => {
    e.preventDefault();
    let task = { title: data.title || 'Task', content: data.content || "No content", date: data.date, id: Date.now() }

    let arr = JSON.parse(localStorage.getItem("tasks"));
    arr.push(task);
    localStorage.setItem("tasks", JSON.stringify(arr));
    setTasks(arr);
    reset();
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  return (
    <>
      <S.Header><Text size="36px" bold>My Tasks</Text></S.Header>
      <S.Form noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <TextField className="txt" variant="standard" {...register('title', { required: false })} id="input-with-icon-grid" label="Title" />
        <TextField className="txt" variant="standard" multiline={true} {...register('content', { required: false })} id="input-with-icon-grid" label="Content" />
        <input type="date" className="date" variant="standard"{...register('date', { required: false })} id="input-with-icon-grid" label="Date" />
        <button type="submit">Add</button>
      </S.Form>

      <S.Tasks> {tasks && tasks.map(task => {
        return (<S.Task>
          <Card >
            <center><h1>{task.title}</h1></center>
            <Typography gutterBottom component="p">{task.content}</Typography>
            <p>{task.date && new Date(task.date).toISOString().substring(0, 10)}</p>

            <IconButton onClick={() => {
              let arr = JSON.parse(localStorage.getItem("tasks"));
              arr = arr.filter(t => t.id !== task.id);
              localStorage.setItem("tasks",JSON.stringify(arr))
              setTasks(arr);
            }}
              color="primary" aria-label="delete from shopping cart">
              <DeleteIcon />
            </IconButton>
          </Card>
        </S.Task>)
      })
      }</S.Tasks>
    </>
  );
};

export default Tasks;
