import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function ProjectList() {
    const  [projectList, setProjectList] = useState([])

    useEffect(() => {
        fetchProjectList()
    }, [])

    const fetchProjectList = () => {
        axios.get('/api/project')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Jesteś pewien!?',
            text: "Ze względu na politykę ciasteczkową staramy się nie przetrzymywać rzeczy które usunąłeś :)",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Usuń to!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/project/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Gra została usunięta!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProjectList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hjuston mamy problem!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h1 className="text-center mt-5 mb-3">Impro Apka</h1>
                <Link
                    to={`/login`}
                    className="btn btn-outline-info mx-1">
                    Show
                </Link>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Create New Project
                        </Link>


                    </div>

                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th width="240px">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projectList.map((project, key)=>{
                                return (
                                    <tr key={key} style="height:50px">
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td>
                                            <Link
                                                to={`/show/${project.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Show
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/edit/${project.id}`}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={()=>handleDelete(project.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectList;