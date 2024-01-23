import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import fetchData from "../../axios";
import { useRouter } from "next/router";
import Modal from "react-responsive-modal";
import Countdown from "react-countdown";

const NewExam = () => {
  const makeRequest = fetchData();
  const router = useRouter();
  const [exam, setExam] = useState([]);
  const [examResult, setExamResult] = useState([]);
  const [questionId, setQuestionId] = useState(null);
  const [state, setState] = useState("");
  const [click, setClick] = useState(false);

  const [open, setOpen] = useState(false);

  const onOpenModal = (state) => {
    setState(state);
    setOpen(true);
  };
  const onCloseModal = (state) => {
    setTimeout(() => {
      setState(false);
    }, 1000);
    setOpen(false);
  };

  useEffect(() => {
    const form = new FormData();
    form.append("course_id", Number(router.query.course_id));
    form.append("bundle_id", Number(router.query.bundleId));

    makeRequest("POST", "/bundle/get-exam", form)
      .then((res) => {
        console.log(JSON.parse(res.data.response[0].exam));
        let exam = JSON.parse(res.data.response[0].exam);
        setQuestionId(res.data.response[0].id);
        console.log(res.data.response[0].id);
        setExam(exam);
        exam.forEach((item) => {
          setExamResult((prev) => {
            return [...prev, { question: item.question, answer: "" }];
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setExamResult([]);
    };
  }, []);

  function setAnswer(question, answer) {
    console.log(question, answer);
    setExamResult((prev) =>
      prev.filter((item) => {
        if (item.question == question) {
          item["answer"] = answer;
          return item;
        } else {
          return item;
        }
      })
    );
  }

  function timerExpired() {
    handleSubmit()
  }

  function handleSubmit() {
    console.log(router.query.bundleId);
    const form = new FormData();
    setClick(true);
    form.append("answer", JSON.stringify(examResult));
    form.append("question_id", questionId);
    form.append("enrolled_course_id", Number(router.query.bundleId));
    makeRequest("POST", "/bundle/validate-exam", form)
      .then((res) => {
        setClick(false);
        localStorage.setItem(
          "wrong-answers",
          JSON.stringify({
            questions: res.data.response.wrongAnswers,
            courseName: router.query.courseName,
            per: res.data.response.per,
          })
        );
        location.pathname = "learnCourse/result";
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function validateAnswers() {
    console.log(examResult);
    if (examResult.find((item) => item.answer == "")) {
      onOpenModal(true);
    } else {
      onOpenModal(false);
    }
  }
  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <>
          {state ? (
            <>
              <div style={{ padding: "1rem", color: "#212a50" }}>
                Please select one option in each question
              </div>
            </>
          ) : (
            <>
              <p
                style={{
                  padding: ".5rem",
                  margin: ".5rem",
                  textAlign: "center",
                }}
              >
                Once you submit , you will no longer be able to change
                <br />
                your answers for this attempt. <br />
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  {click && (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {click ? "Loading..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </>
      </Modal>
      <div className="row">
      <Countdown onComplete={timerExpired} date={Date.now() + 1800000} />
        <div className="col-md-12 ">
          <div className="dash-shadow p-4 mt-4">
            <div className="dash-shadow p-4 mt-2 col-md-12">
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h5 className="" style={{ color: "#212a5" }}>
                  Online Assessment
                </h5>
                <h5>{router.query.courseName}</h5>
              </div>
              <small style={{ color: "#212a50" }}>
                After you completed the online assessment, you need to click on
                the SUBMIT button at the bottom of the page. Once you have done
                this, you will not be able to return to the question page to
                change any of your answers, so make sure that you have checked
                all of your answers before you finish. At the end of the exam
                you will immediately receive your score. <span style={{color:'#b31528'}}> (To obtain a certificate, you must achieve a minimum score of 80%.)</span>
              </small>
            </div>
            {exam &&
              exam.map((item, i) => (
                <div className="dash-shadow p-4 mt-4">
                  <p>
                    {++i}. {item.question}
                  </p>
                  <form action="button">
                    {item.options.map((option, i) => (
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <span style={{ display: "flex", textWrap: "wrap" }}>
                            {" "}
                            <Form.Check
                              type="radio"
                              name="option"
                              value="a"
                              onClick={() => setAnswer(item.question, option)}
                              aria-label="radio 1"
                            />{" "}
                            <p
                              name="option"
                              style={{ marginLeft: "10px", overflow: "auto" }}
                            >
                              {String.fromCharCode(97 + i)} {")   "} {option}
                            </p>
                          </span>
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="btn btn-success mt-3 " onClick={validateAnswers}>
                Submit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExam;
