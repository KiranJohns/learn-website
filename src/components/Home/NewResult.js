import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import fetchData from "../../axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getUserType } from "../../axios";

const NewResult = () => {
  const makeRequest = fetchData();
  const router = useRouter();
  const [exam, setExam] = useState([]);
  const [examFrom, setExamFrom] = useState(() => localStorage.getItem('exam-from'))

  const [examResult, setExamResult] = useState(() => {
    let result = JSON.parse(localStorage.getItem("wrong-answers"));
    if (result === null)  {
      result = {
        courseName:'',
   per:'',
   questions:[],
      }
    };
    let per = result?.per?.split(' ')
    if(per)  {   result['per'] = per[0] }
    else {
      result['per'] = 0;    
    }
    
    return result;
  });
  const [questionId, setQuestionId] = useState(null);

  useEffect(() => {}, []);

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
                className="exam-head"
                // style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h5 className="" style={{ color: "#212a5" }}>
                  Result
                </h5>
                <h5 className="" style={{marginLeft:"1rem",textAlign:"center"}}>{examResult?.courseName}</h5>
              </div>
            </div>

            <div
              style={{ textAlign: "center" }}
              className="dash-shadow p-4 mt-4"
            >
              <h4>You have scored {examResult?.per} % marks</h4>
            </div>

            <div style={{ textAlign: "" }} className="dash-shadow p-4 mt-4">
              <h4>Wrong Answers</h4>

              {examResult?.questions?.length > 0 ? (
                examResult?.questions?.map((item, i) => (
                  <div className=" p-2 ">
                    <p>
                      {++i}. {item.question}
                    </p>
                    <form action="button">
                      {/* <div className="row">
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
                            {item.answer}
                          </p>
                        </span>
                      </div>
                    </div> */}
                    </form>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    fontWeight: "700",
                    color: "#000",
                    marginTop: "1rem",
                    marginLeft: ".5rem",
                  }}
                >
                  None
                </p>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              {examResult?.per > 80 ? (
                <span
                  className="btn btn-success mt-3 "
                  onClick={() => {
                    location.href = `/${getUserType()}/certificates`;
                    localStorage.removeItem("wrong-answers");
                  }}
                >
                  Certificates
                </span>
              ) : (
                <span
                  className="btn btn-success mt-3 "
                  onClick={() => {
                    let to = ''
                    if(examFrom == 'course') {
                      to = `/${getUserType()}/mycourses`
                    } else {
                      to = `/${getUserType()}/mybundles`
                    }
                    location.href = to;
                    localStorage.removeItem("wrong-answers");
                  }}
                >
                  {examFrom == 'course' ? 'My Course' : 'My Bundle'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewResult;
