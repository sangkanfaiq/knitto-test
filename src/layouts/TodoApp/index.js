import React, { useState } from "react";
import styles from "@/styles/Todo.module.scss";
import { MdAdd } from "react-icons/md";
import Image from "next/image";
import ModalAdd from "./ModalAdd";
import { useGetTodoQuery, useUpdateTodoMutation } from "@/redux/Todo";
import { toast, ToastContainer } from "react-toastify";

const TodoLayout = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");
  const start = page * 10 - 10;
  const { data: dataTodo } = useGetTodoQuery({ start: start, limit: 10 });
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const handleUpdate = async (data) => {
    try {
      setId(data.id);
      const res = await updateTodo(data).unwrap();
      toast.success("Task completed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section style={{ background: "#050406", minHeight: '100vh' }}>
        <div className="container">
          <div className={styles.title}>
            <h1>
              <span>To Do </span>App
            </h1>
          </div>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <h2>List todo</h2>
              <button data-bs-target="#staticBackdrop" data-bs-toggle="modal">
                <MdAdd className={styles.icon} />
                Add new todo
              </button>
              {dataTodo?.length !== 0 ? (
                dataTodo?.map((item, index) => {
                  return (
                    <div
                      className={styles.listcontent}
                      key={item.id}
                      onClick={() =>
                        handleUpdate({
                          id: item.id,
                          completed: true,
                        })
                      }
                    >
                      <h5>{index + start + 1}.</h5>
                      <div className={styles.checkbox}>
                        {item.completed === true ? (
                          <Image
                            src="/icons/check-w.png"
                            alt="Check"
                            width={25}
                            height={25}
                            className={styles.img}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <p
                        className={
                          item.completed === true
                            ? styles.finished
                            : styles.unfinished
                        }
                      >
                        {id === item.id ? (
                          isLoading ? (
                            <>
                              <div
                                class="spinner-border spinner-border-sm me-2"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                              Loading...
                            </>
                          ) : (
                            item.title
                          )
                        ) : (
                          item.title
                        )}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center flex-column align-items-center mt-5">
                  <div
                    class="spinner-border spinner-border-md me-2 text-light"
                    role="status"
                  >
                  </div>
                  <h1 className="text-light fs-4 mt-3">Loading...</h1>
                </div>
              )}
              {dataTodo?.length === 0 ? (
                ""
              ) : (
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-md d-flex justify-content-center">
                    <li className="page-item">
                      <a
                        className="page-link bg-dark text-light"
                        style={{ cursor: "pointer" }}
                        aria-label="Previous"
                        onClick={() =>
                          setPage((prev) => {
                            return prev === 1 ? 1 : prev - 1;
                          })
                        }
                      >
                        <span
                          aria-hidden="true"
                          style={{ background: "transparent" }}
                        >
                          &laquo;
                        </span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link bg-dark text-light" href="#">
                        {page}
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className="page-link bg-dark text-light cursor-pointer"
                        style={{ cursor: "pointer" }}
                        aria-label="Next"
                        onClick={() =>
                          setPage((prev) => {
                            return prev + 1;
                          })
                        }
                      >
                        <span
                          aria-hidden="true"
                          style={{ background: "transparent" }}
                        >
                          &raquo;
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
          <ModalAdd />
        </div>
      </section>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default TodoLayout;
