import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ContactForm from './ContactForm';
import firebaseDB from "./firebase";

const Contacts = () => {

	const [contactsObject, setContactsObjects] = useState({});
	const [currentId, setCurrentId] = useState('');

	useEffect(() => {
		firebaseDB.child('contacts').on('value', snapshot => {
			if (snapshot.val() !== null) {
				setContactsObjects({
					...snapshot.val()
				})
			} else
				setContactsObjects({})
		})
	}, []);

	const addOrEdit = obj => {
		if (currentId === '')
			firebaseDB.child('contacts').push(
				obj,
				err => {
					if (err)
						console.log(err);
					else
						setCurrentId('');
				}
			);
		else
			firebaseDB.child(`contacts/${currentId}`).set(
				obj,
				err => {
					if (err)
						console.log(err);
					else
						setCurrentId('');
				}
			);
	}

	const onDelete = key => {
		if (window.confirm('Are you sure you want to delete the contact?')) {
			firebaseDB.child(`contacts/${key}`).remove(
				err => {
					if (err)
						console.log(err);
					else
						setCurrentId('');
				}
			);
		}
	}

	return (
		<>
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<h1 className="display-4 text-center">Contact Register</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<ContactForm {...({ addOrEdit, currentId, contactsObject })} />
				</div>
				<div className="col-md-8">
					<table className="table table-borderless table-stripped table-hover">
						<thead className="thead-dark">
							<tr>
								<th>Full Name</th>
								<th>Email ID</th>
								<th>Mobile Number</th>
								<th>Address</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								Object.keys(contactsObject).map(id => {
									return <tr key={id}>
										<td>{contactsObject[id].fullName}</td>
										<td>{contactsObject[id].email}</td>
										<td>{contactsObject[id].mobile}</td>
										<td>{contactsObject[id].address}</td>
										<td>
											<button className="btn text-primary"
												onClick={() => { setCurrentId(id) }}
											>
												<i className="fas fa-pencil-alt"></i>
											</button>
											<button className="btn text-danger"
												onClick={() => { onDelete(id) }}
											>
												<i className="fas fa-trash-alt"></i>
											</button>
										</td>
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Contacts;