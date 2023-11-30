import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import fetchData from "../../axios";
import { useRouter } from "next/router";
import Modal from "react-responsive-modal";

const NewExam = () => {
  const makeRequest = fetchData();
  const router = useRouter();
  const [exam, setExam] = useState([]);
  const [examResult, setExamResult] = useState([]);
  const [questionId, setQuestionId] = useState(null);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
 

  useEffect(() => {
    const form = new FormData();
    form.append("course_id", Number(router.query.course_id));
    form.append("bundle_id", Number(router.query.bundleId));

    makeRequest("POST", "/bundle/get-exam", form)
      .then((res) => {
        console.log(JSON.parse(res.data.response[0].exam));
        let exam = JSON.parse(res.data.response[0].exam);
        setQuestionId(res.data.response[0].id)
        console.log(res.data.response[0].id)
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
        setExamResult([])
      }
  }, []);

  function setAnswer(question, answer) {
    console.log(question, answer);
    setExamResult((prev) =>
      prev.filter((item) => {
        if (item.question == question) {
          item['answer'] = answer
          return item;
        } else {
          return item;
        }
      })
    );
  }

  function handleSubmit() {
    console.log(router.query.bundleId);
    const form = new FormData();
    form.append("answer", JSON.stringify(examResult));
    form.append("question_id", questionId);
    form.append("enrolled_course_id", Number(router.query.bundleId));
    makeRequest("POST", "/bundle/validate-exam", form)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
       <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>
      <div className="row">
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
                <h5> Wellness Recovery Action plan</h5>
              </div>
              <small style={{ color: "#212a50" }}>
                After you completed the online assessment, you need to click on
                the SUBMIT button at the bottom of the page. Once you have done
                this, you will not be able to return to the question page to
                change any of your answers, so make sure that you have checked
                all of your answers before you finish. At the end of the exam
                you will immediately receive your score!
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
                              style={{ marginLeft: "1px", overflow: "auto" }}
                            >
                              {String.fromCharCode(97 + i)}. {option}
                            </p>
                          </span>
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              ))}
            <span className="btn btn-success mt-3 float-right" onClick={handleSubmit}>
              submit
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExam;
