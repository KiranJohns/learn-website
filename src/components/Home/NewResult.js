import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import fetchData from "../../axios";
import { useRouter } from "next/router";

const NewResult = () => {
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
                <h5 className="" style={{ color: "#212a5" }}>
                  Result
                </h5>
                <h5> Course Name</h5>
              </div>
            
            </div>

            <div style={{textAlign:'center'}} className="dash-shadow p-4 mt-4">
             <h4>You have scored 56% marks</h4>
            </div>
           
                <div className="dash-shadow p-4 mt-4">
                  <p>
                1.  Wrong Questions is shown here one by one
                  </p>
                  <form action="button">
                  
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
                            Correct option
                            </p>
                          </span>
                        </div>
                      </div>
              
                  </form>
                </div>
      
            <span className="btn btn-success mt-3 float-right" onClick={handleSubmit}>
            Go back to my Courses(fail)/  Certificate (pass)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewResult;