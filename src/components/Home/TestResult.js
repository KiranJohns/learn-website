import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import fetchData from "../../axios";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';

const TestResult = () => {
  const makeRequest = fetchData();
  const router = useRouter();
  const [exam, setExam] = useState([]);
  const [examResult, setExamResult] = useState([]);
  const [questionId, setQuestionId] = useState(null);

  useEffect(() => {
    const form = new FormData();
    form.append("course_id", router.query.id);
    form.append("enrolled_course_id", router.query.user);

    makeRequest("POST", "/exam/get-exam", form)
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
    const form = new FormData();
    form.append("answer", JSON.stringify(examResult));
    form.append("enrolled_course_id", router.query.user);
    form.append("question_id", questionId);
    makeRequest("POST", "/exam/validate", form)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12 ">
          <div className="dash-shadow p-4 mt-4">
            <div className="dash-shadow p-4 mt-2 col-md-12">
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4 className="" style={{ color: "#212a5" }}>
                 Result
                </h4>
                <h5> Wellness Recovery Action plan</h5>
              </div>
              <small style={{ color: "#212a50" }}>
              
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
              <div style={{display:"flex",justifyContent:'center'}}>
            <Button  className="btn btn-success mt-3 float-right" onClick={handleSubmit}>
              View Certificate (win)/ my courses(fail)
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
