import React, { useEffect, useState } from "react";
import axios from "axios";

//This is where it displays the image and user and name using an API
export const PictureAPI = () => {
  const [name, setName] = useState<string>(); //This is what sets the name for the picture
  const [picture, setPicture] = useState<string>(); //This sets the picture in a used state
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    let response = await axios.get("https://randomuser.me/api");
    setName(
      response.data.results[0].name.first +
        " " +
        response.data.results[0].name.last
    );
    setPicture(response.data.results[0].picture.large);
  };
  //This grabs the data from the API

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div>
        <img
          src={picture}
          alt="Girl in a jacket"
          width="60"
          height="60"
          style={{ borderRadius: "50%" }}
        ></img>
      </div>
      <div style={{ marginTop: "10%", marginLeft: "10px" }}>{name}</div>
    </div>
  );
};
