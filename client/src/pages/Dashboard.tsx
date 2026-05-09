import { useEffect, useState } from 'react'
import API from '../api/api'

const Dashboard = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] =
        useState('')

    const [projects, setProjects] = useState([])
    const [taskTitle, setTaskTitle] =
        useState('')

    const [taskDescription, setTaskDescription] =
        useState('')

    const [tasks, setTasks] = useState([])

    // FETCH PROJECTS
    const fetchProjects = async () => {
        try {
            const res = await API.get('/projects')

            setProjects(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    // CREATE PROJECT
    const handleCreateProject = async (
        e: any
    ) => {
        e.preventDefault()

        try {
            await API.post('/projects', {
                title,
                description,
            })

            alert('Project Created')

            setTitle('')
            setDescription('')

            fetchProjects()
        } catch (err) {
            console.log(err)

            alert('Error creating project')
        }
    }
    const fetchTasks = async () => {
        try {
            const res = await API.get('/tasks')

            setTasks(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleCreateTask = async (
        e: any
    ) => {
        e.preventDefault()

        try {
            await API.post('/tasks', {
                title: taskTitle,
                description: taskDescription,
            })

            alert('Task Created')

            setTaskTitle('')
            setTaskDescription('')

            fetchTasks()
        } catch (err) {
            console.log(err)

            alert('Error creating task')
        }
    }
    const updateTaskStatus = async (
        taskId: string,
        status: string
    ) => {
        try {
            await API.put(`/tasks/${taskId}`, {
                status,
            })

            fetchTasks()
        } catch (err) {
            console.log(err)
        }
    }
    const deleteTask = async (taskId: string) => {
        try {
            await API.delete(`/tasks/${taskId}`)

            fetchTasks()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchTasks()
    }, [])
    const totalTasks = tasks.length

    const completedTasks = tasks.filter(
        (task: any) => task.status === 'done'
    ).length

    const pendingTasks = tasks.filter(
        (task: any) => task.status === 'todo'
    ).length

    const inProgressTasks = tasks.filter(
        (task: any) =>
            task.status === 'in-progress'
    ).length

    const handleLogout = () => {
        localStorage.removeItem('token')

        window.location.href = '/'
    }
    const user = JSON.parse(
        localStorage.getItem('user') || '{}'
    )

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-5 py-2 rounded"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-4 gap-5 mb-10">
                <div className="bg-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">
                        Total Tasks
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {totalTasks}
                    </p>
                </div>

                <div className="bg-green-500 text-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">
                        Completed
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {completedTasks}
                    </p>
                </div>

                <div className="bg-yellow-500 text-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">
                        Pending
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {pendingTasks}
                    </p>
                </div>

                <div className="bg-blue-500 text-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">
                        In Progress
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {inProgressTasks}
                    </p>
                </div>
            </div>

            {/* CREATE PROJECT FORM */}
            {user.role === 'admin' && (
                <form
                    onSubmit={handleCreateProject}
                    className="bg-white p-6 rounded-lg shadow-lg mb-10"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Create Project
                    </h2>

                    <input
                        type="text"
                        placeholder="Project Title"
                        className="border p-2 w-full mb-4 rounded"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Project Description"
                        className="border p-2 w-full mb-4 rounded"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <button className="bg-black text-white px-4 py-2 rounded">
                        Create
                    </button>
                </form>
            )}

            {user.role === 'admin' && (
                <form
                    onSubmit={handleCreateTask}
                    className="bg-white p-6 rounded-lg shadow-lg mb-10"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Create Task
                    </h2>

                    <input
                        type="text"
                        placeholder="Task Title"
                        className="border p-2 w-full mb-4 rounded"
                        value={taskTitle}
                        onChange={(e) =>
                            setTaskTitle(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Task Description"
                        className="border p-2 w-full mb-4 rounded"
                        value={taskDescription}
                        onChange={(e) =>
                            setTaskDescription(e.target.value)
                        }
                    />

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Create Task
                    </button>
                </form>
            )}

            {/* PROJECT LIST */}
            <div>
                <h2 className="text-2xl font-bold mb-4">
                    Projects
                </h2>

                <div className="grid grid-cols-3 gap-5">
                    {projects.map((project: any) => (
                        <div
                            key={project._id}
                            className="bg-white p-5 rounded-lg shadow"
                        >
                            <h3 className="text-xl font-bold">
                                {project.title}
                            </h3>

                            <p className="mt-2 text-gray-600">
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                    Tasks
                </h2>

                <div className="grid grid-cols-3 gap-5">
                    {tasks.map((task: any) => (
                        <div
                            key={task._id}
                            className="bg-white p-5 rounded-lg shadow"
                        >
                            <h3 className="text-xl font-bold">
                                {task.title}
                            </h3>

                            <p className="mt-2 text-gray-600">
                                {task.description}
                            </p>

                            <div className="mt-3">
                                <p className="mb-2">
                                    Status:
                                    <span className="font-bold ml-2">
                                        {task.status}
                                    </span>
                                </p>

                                <select
                                    className="border p-2 rounded"
                                    value={task.status}
                                    onChange={(e) =>
                                        updateTaskStatus(
                                            task._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="todo">Todo</option>

                                    <option value="in-progress">
                                        In Progress
                                    </option>

                                    <option value="done">Done</option>
                                </select>
                                {user.role === 'admin' && (
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard