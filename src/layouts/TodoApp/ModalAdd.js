import React, { useState } from "react";
import styles from "@/styles/Todo.module.scss";
import { MdOutlineClose } from 'react-icons/md'
import { usePostTodoMutation } from "@/redux/Todo";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModalAdd = () => {
  const [postTodo, {isLoading}] = usePostTodoMutation()
  const [ add, setAdd ] = useState('')

  const handleAdd = async (title) => {
    try {
      const res = await postTodo(title).unwrap()
      toast.success('Add new todo success')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    <div
      className={`${styles.modalBg} modal fade`}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className={`${styles.modalAdd} modal-dialog modal-dialog-centered`}>
        <div className="modal-content bg-dark">
          <div className="modal-header bg-dark">
            <h1 className="modal-title fs-5 bg-dark text-light" id="staticBackdropLabel">
              Add new
            </h1>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className={styles.buttonclose}
            ><MdOutlineClose color="#fff" size={24} className={styles.icon}/></button>
          </div>
          <div className="modal-body bg-dark py-5">
            <input type="text" placeholder="Add new todo" onChange={(e)=> {
              setAdd(e.target.value)
            }}/>
          </div>
          <div className="d-flex justify-content-end gap-2 p-3 bg-dark">
            <button
              type="button"
              className={`${styles.cancel} btn`}
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className={`${styles.add} btn`} onClick={()=> handleAdd(add)}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer autoClose={2000} theme="light" style={{background: 'transparent'}}/>
    </>
  );
};

export default ModalAdd;
