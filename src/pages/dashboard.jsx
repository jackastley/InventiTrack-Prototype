import React, { useState } from "react"
import { useEffect } from "react";
import LineChart from "./react-components/LineChart";
import { Card, Dropdown } from "react-bootstrap";

import {
  Container,
  Row,
  Col
} from 'react-bootstrap'


import 'bootstrap/dist/css/bootstrap.min.css';



export default function Dashboard() {


  let [postData, setPostData] = useState(null);
  let [DBData, setDBData] = useState(null)
  let [name, setName] = useState(null)
  let [showCompare, setShowCompare] = useState(false)
  let [firstCompChart, setFirstCompChart] = useState(["Time spent at work", 'work_time', "rgba(75,192,192,1)", "hrs"])
  let [secondCompChart, setSecondCompChart] = useState(["Sleep", 'sleep', "lightgreen", "hrs"])
  let [firstChartLoad, setFirstChartLoad] = useState(false)
  let [secondChartLoad, setSecondChartLoad] = useState(false)
  let [timespan, setTimespan] = useState(0)

  useEffect(() => {
    fetch("http://" + process.env.REACT_APP_EXTERNAL_IP + ":9000/api/trackdata", {
      method: "POST",
      body: JSON.stringify({ token: JSON.parse(sessionStorage.getItem('token')) }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => setPostData(res))
  }, []);

  useEffect(() => {
    if (postData) {
      let stateJSON = {};
      for (let bVaraible in postData[postData.length - 1]) {
        stateJSON[bVaraible] = [];
      }
      for (let entryIndex in postData) {
        for (let bVaraible in postData[entryIndex]) {
          stateJSON[bVaraible].push(postData[entryIndex][bVaraible])
        }
      }
      setDBData(stateJSON);
    }
  }, [postData])


  useEffect(() => {
    setFirstChartLoad(!firstChartLoad)
  }, [firstCompChart])

  useEffect(() => {
    setSecondChartLoad(!setSecondChartLoad)
  }, [setSecondChartLoad])

  useEffect(() => {
    setName(JSON.parse(sessionStorage.getItem('firstName')));
  }, [])

  function constructLineChart(title, variable, colour, metric) {
    return <>
      <Col md={6} className="p-2" >
        <Card style={{ padding: "15px" }} className={"shadow-sm"}>
          <h4>{title}</h4>
          <LineChart varData={DBData[variable]} dates={DBData.date} chartLabel={metric} colour={colour} timespan={timespan} />
        </Card>
      </Col>
    </>
  }


  function selectChart(code) {
    switch (code) {
      case 1:
        return ["Time spent at work", 'work_time', "rgba(75,192,192,1)", "hrs"]
      case 2:
        return ["Sleep", 'sleep', "lightgreen", "hrs"]
      case 3:
        return ["Exercise", 'exercise', 'orange', 'minutes']
      case 4:
        return ["Healthy eating", "healthy_food", 'rgba(75,192,192,1)', 'rating']
      case 5:
        return ["Productivity ", "productivity", "lightgreen", "rating"]
      case 6:
        return ["Stress ", "stress", "orange", "rating"]
      case 7:
        return ["Happiness ", "happy", "rgba(75,192,192,1)", "rating"]
      default:
        return ["Time spent at work", 'work_time', "rgba(75,192,192,1)", "hrs"]
    }
  }

  function rerenderCharts() {
    return (
      <>
        {constructLineChart("Time spent at work", 'work_time', "rgba(75,192,192,1)", "hrs")}
        {constructLineChart("Sleep", 'sleep', "lightgreen", "hrs")}
        {constructLineChart("Exercise", 'exercise', 'orange', 'minutes')}
        {constructLineChart("Healthy eating", "healthy_food", 'rgba(75,192,192,1)', 'rating')}
        {constructLineChart("Productivity ", "productivity", "lightgreen", "rating")}
        {constructLineChart("Stress ", "stress", "orange", "rating")}
        {constructLineChart("Happiness ", "happy", "rgba(75,192,192,1)", "rating")}
      </>
    )
  }


  return (
    <>
      <br />
      {(DBData  &&
        <>
          <Container>
            <Row >
              <Col>
                <h3 style={{ fontWeight: "bolder" }}>Hi {name},</h3>
                <h4 > Welcome to your dashboard.</h4>
              </Col>
              <Col style={{ 'text-align': 'end', 'padding-top': '20px' }}>
                <Dropdown className="dropdownx">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    View
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowCompare(false)}>All Data</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowCompare(true)}>Compare</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="dropdownx">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Timespan
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTimespan(7)}>7-day</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTimespan(0)}>All time</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>

          <Container>
            {!showCompare && !(!timespan) && <Row >
              {rerenderCharts()}
            </Row>}
            {!showCompare && !timespan && <Row >
              {rerenderCharts()}
            </Row>}
          </Container>

          <Container>
            {/* comparison view */}
            {showCompare &&
              <>
                <Row >
                  <Col></Col>
                  {firstChartLoad && !timespan && constructLineChart.apply(null, firstCompChart)}
                  {!firstChartLoad && !timespan && constructLineChart.apply(null, firstCompChart)}
                  {firstChartLoad && !(!timespan) && constructLineChart.apply(null, firstCompChart)}
                  {!firstChartLoad && !(!timespan) && constructLineChart.apply(null, firstCompChart)}
                  <Col></Col>
                </Row>

                <Row>
                  <Col></Col>
                  <Col>
                    <Dropdown className="text-center">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Chart 1
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(1)) }}>Time spent at work</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(2)) }}>Sleep</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(3)) }}>Exercise</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(4)) }}>Healthy eating</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(5)) }}>Productivity</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(6)) }}>Stress</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setFirstCompChart(selectChart(7)) }}>Happiness</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col>
                    <Dropdown className="text-center">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Chart 2
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(1)) }}>Time spent at work</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(2)) }}>Sleep</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(3)) }}>Exercise</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(4)) }}>Healthy eating</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(5)) }}>Productivity</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(6)) }}>Stress</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSecondCompChart(selectChart(7)) }}>Happiness</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col></Col>
                </Row>

                <Row>
                  <Col></Col>
                  {secondChartLoad && !(!timespan) && constructLineChart.apply(null, secondCompChart)}
                  {!secondChartLoad && !(!timespan)  && constructLineChart.apply(null, secondCompChart)}
                  {secondChartLoad && !timespan  && constructLineChart.apply(null, secondCompChart)}
                  {!secondChartLoad && !timespan  && constructLineChart.apply(null, secondCompChart)}
                  <Col></Col>
                </Row>
              </>
            }
          </Container>
        </>) || <>
        <h1 style={{padding:'10px'}}>Not enough data yet...</h1>
        <p style={{padding:'10px'}}>You need a minumum of 2 days of tracking data to see your dashboard. Click track on the navbar to start collecting!</p>
        </>
      }
    </>
  )
}