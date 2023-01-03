// import React, { useState } from "react";
// import { connect } from "react-redux";

// function GoogleDriveFileUploader() {
  
//   // constructor(props){
//   //   //     super(props)
//   //   //   }
//   const [url, setUrl] = useState("");
//   const [file, setFile] = useState(null);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     formData.append("file", file.data);
//     const response = await fetch("http://localhost:8080/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const responseWithBody = await response.json();
//     console.log(responseWithBody)
//     // if (response) setUrl(responseWithBody.publicUrl);
//   };

//   const handleFileChange = (e) => {
//     const file = {
//       preview: URL.createObjectURL(e.target.files[0]),
//       data: e.target.files[0],
//     };
//     setFile(file);
//   };

//   const submitImage = (url) => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: "SUBMIT_IMAGE",
//       url
//     })
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" name="file" onChange={handleFileChange}></input>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

import axios from 'axios';

import React,{Component} from 'react';

import { connect } from "react-redux";

const apiUrl = "http://localhost:8080/upload"

class GoogleDriveFileUploader extends Component {

	constructor(props){
		super(props)
	}

	submitImage = (url) => {
		const { dispatch } = this.props;
		dispatch({
			type: "SUBMIT_IMAGE",
			url
		})
	}

	state = {
		// Initially, no file is selected
		selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = e => {
		const file = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		};
		this.setState({ selectedFile: file });
	};
	
	onFileUpload = async () => {
	
		const formData = new FormData();
		formData.append(
			"file",
			this.state.selectedFile.data,
		);

		const response = await fetch("http://localhost:8080/upload", {
			method: "POST",
			body: formData,
			});
		const responseWithBody = await response.json();
		this.submitImage(responseWithBody.message)
		console.log(responseWithBody.message)
	};
	
	render() {
		return (
			<div>
				<div>
					<input type="file" name="file" onChange={this.onFileChange} />
					<button onClick={this.onFileUpload}>Upload</button>
				</div>
			</div>
		);
	}
}

export default connect()(GoogleDriveFileUploader)