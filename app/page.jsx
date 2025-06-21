"use client";
import { useState, useEffect } from "react";
import ProfileCard from "@components/Profile card";
import MainButton from "@components/MainButton";
import Timeline from "@components/Timeline";
import SampleData from "@components/SampleData";
import CustomData from "@components/CustomData";
import FileUploader from "@components/FileUploader";
import Image from "next/image";

export default function page() {
  //To show custom component
  const [fileState, setFileState] = useState(false);
  
  //To show in UI
  const [fileName, setFileName] = useState("No file chosen");

  //To access the data of output
  const [outputData, setOutputData] = useState({});
  

  //To delete the images from the database
  const resetFile = async () => {
    await fetch("/api/upload/reset", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boxplot_url: outputData.boxplot_url,
        heatmap_url: outputData.heatmap_url,
      }),
    });
  };
  useEffect(() => {
    resetFile();
  }, []);


  return (
    <>
      <nav className="navBar flex-row">
        <div className="title">EDA</div>
        <div className="about">
          <div className="flex-row account">
            <Image
              src="/assets/account.png"
              width={40}
              height={40}
              alt="profile"
            />
            <div>About</div>
          </div>
          <ProfileCard />
        </div>
      </nav>
      <main>
        <div className="heroSection">
          <Image
            src="/assets/pie-chart.png"
            alt="pie chart"
            className="hero_Image Image1"
            width={200}
            height={200}
          />
          <Image
            src="/assets/bar-graph.png"
            alt="bar graph"
            className="hero_Image Image2"
            width={200}
            height={200}
          />
          <Image
            src="/assets/speech-bubble.png"
            alt="omg in bubble"
            className="hero_Image Image3"
            width={160}
            height={160}
          />
          <Image
            src="/assets/backdrop.png"
            alt="backdrop"
            className="backdropImage"
            width={813}
            height={715}
          />
          <Image
            src="/assets/speech-bubble-2.png"
            alt="bang"
            className="hero_Image Image4"
            width={160}
            height={160}
          />
          <h1>EXPLORATORY DATA ANALYSIS</h1>
          <div className="description">
            Exploratory Data Analysis (EDA) helps uncover{" "}
            <b>patterns, trends, and anomalies</b> in a dataset through
            statistical summaries and visualizations. It provides key insights
            by analyzing distributions, relationships, and missing values,
            making data ready for further processing or modeling.
          </div>
          <div className="heroButtons">
            <MainButton text="Explore sample data" icon="/assets/explore.svg" />
            <FileUploader
              upload="/assets/upload.svg"
              setFileName={setFileName}
              fileName={fileName}
              setOutputData = {setOutputData}
              setFileState={setFileState}
            />
          </div>
        </div>
        <div className="steps">
          <h1>Steps to perform EDA </h1>
          <Timeline />
        </div>
        <div className="hLine" id="hrLine"></div>
        {fileState ? (
          <CustomData file={fileName} outputData={outputData} />
        ) : (
          <SampleData />
        )}
      </main>
    </>
  );
}
