import React from 'react';
import { json } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Define a React component that takes JSON data as a prop
const ReportLayout = ({ jsonData }) => {
  
  // Assign values to variables using 'const'
  const text = "a dam is a wall built across a river when it rains a lot of water goes down the river and into the sea the dam stops the water the water then becomes a big lake behind the dam later this water is let out into the fields there it helps crops like rice to grow";

  const { subs_details, ins_details, del_details ,wcpm,speech_rate,pron_score} = jsonData;
  function modifyText(decodedText, insertedDetails, deleted, substituted) {
    let wordList = decodedText.split(" ");
    let insertedMap = {};
    let deletedMap = {};
    let substitutedMap = {};

    if (deleted.length > 0) {
      deleted = deleted.split(",");
      for (let i = 0; i < deleted.length; i++) {
        let detail = deleted[i].split("-");
        let index = parseInt(detail[0]);
        deletedMap[index] = detail[1];
      }
    }

    if (insertedDetails.length > 0) {
      insertedDetails = insertedDetails.split(",");
      for (let i = 0; i < insertedDetails.length; i++) {
        let detail = insertedDetails[i].split(":");
        let index = parseInt(detail[0].split("-")[0]);
        insertedMap[index] = detail[1];
      }
    }

    if (substituted.length > 0) {
      substituted = substituted.split(",");
      for (let i = 0; i < substituted.length; i++) {
        let detail = substituted[i].split(":");
        let index = parseInt(detail[0].split("-")[0]);
        substitutedMap[index] = detail[1];
      }
    }

    let out = [];
    for (let i = 0; i < wordList.length; i++) {
      if (i + 1 in insertedMap) {
        out.push(<span key={uuidv4()}  className="text-red-600 p-1 md:text-lg">{insertedMap[i + 1]}</span>);
      }
      if (i + 1 in deletedMap) {
        out.push(<span key={uuidv4()}  className=' text-blue-600 line-through p-1 md:text-lg'>{deletedMap[i + 1]}</span>);
        continue;
      }
      out.push(<span key={uuidv4()} className={`${i+1 in substitutedMap? "text-yellow-600":"text-green-600"} p-1 md:text-lg`}>{wordList[i]}</span>);
      if (i + 1 in substitutedMap) {
        out.push(<span key={uuidv4()}  className='text-yellow-600 p-1 md:text-lg'>({substitutedMap[i + 1]})</span>);
      }
    }

    return out;
  }



  let proccessHtml = modifyText(text, ins_details, del_details, subs_details);
  

  // Render the import.metaed text
  return (
      <>
      <div className='bg-white text-sm md:text-base rounded-lg shadow-md flex flex-wrap h-auto w-auto'>
        {proccessHtml}
       
      </div>
      <div className='flex-col md:flex-row '>
       <div className="bg-purple-500 text-xs md:text-xl text-white shadow-md md:p-2 md:m-2 md:mt-4 ml-1 inline-block  ">WPM Score: {wcpm}</div>
       <div className="bg-purple-500 text-xs md:text-xl text-white shadow-md md:p-2 md:m-2 md:mt-4 ml-1 inline-block ">Speech Rate: {speech_rate}</div>
       <div className="bg-purple-500 text-xs md:text-xl text-white shadow-md md:p-2 md:m-2 md:mt-4  ml-1 inline-block ">Pronunciation Rate: {pron_score}</div>
       </div>
       <div className="mt-4 text-xs md:text-base">
        <span className="text-red-600 md:font-bold">Inserted Text</span> | 
        <span className="text-blue-600 md:font-bold">Deleted Text</span> | 
        <span className="text-yellow-600 md:font-bold">Substituted Text</span> | 
        <span className="text-green-600 md:font-bold">Original Text</span>
      </div>

       </>
  );
};

export default ReportLayout;
