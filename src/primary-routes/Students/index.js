import React, { useCallback, useEffect, useState } from 'react'
import StudentsData from './data.json'

const StudentConstants = {
    tableHeadings: ['Roll No.', 'Name', 'Class', 'Actions'],
    SEARCH_PLACEHOLDER: 'Search by name',
    EDIT: 'Edit',
    DELETE: 'Delete',
    SAVE: 'Save'
}

export const debounce = (func, delay) => {
    let timeout
    return function delayedFunc(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, delay)
    }

}

const Students = () => {

    const [students, setStudents] = useState(StudentsData.students)
    const [allStudents, setAllStudents] = useState(StudentsData.students)
    const [searchValue, setSearchValue] = useState('')
    const [toEditColumn, setToEditColumn] = useState({})
    const [addStudentData, setAddStudentData] = useState({})
    const [showAddStudentModal, setShowAddStudentModal] = useState(false)

    const filterStudents = useCallback(debounce((value) => {
        const studentName = value.trim()
        if (studentName) {
            setStudents(allStudents.filter(student => student.name.includes(studentName)))
        } else {
            setStudents(allStudents)
        }
    }, 200), [allStudents])

    useEffect(() => {
        filterStudents(searchValue)
    }, [searchValue])

    useEffect(() => {
        setStudents(allStudents)
    }, [allStudents])

    const deleteStudent = (id) => {
        const studentsCopy = [...allStudents]
        setAllStudents(studentsCopy.filter(student => student.id !== id))
    }

    const handleToEditData = (value, field, addData) => {
        const toEditData = { ...(addData ? addStudentData : toEditColumn) }
        toEditData[field] = value
        addData ? setAddStudentData(toEditData) : setToEditColumn(toEditData)
    }

    const saveNewData = () => {
        const studentIndexToSave = allStudents.findIndex(student => student.id === toEditColumn.id)
        const studentsCopy = [...allStudents]
        studentsCopy.splice(studentIndexToSave, 1, toEditColumn)
        setAllStudents(studentsCopy)
        setToEditColumn({})
    }

    const triggerModal = () => setShowAddStudentModal(!showAddStudentModal)

    const addNewStudent = () => {
        setAllStudents([...allStudents, { ...addStudentData, id: allStudents[allStudents.length - 1].id + 1 }])
        triggerModal()
    }

    console.log(allStudents)

    const AddStudentModal = () => <div className="modal" style={{ display: 'initial', background: '#9d9d9d75' }} tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{'Add a new Student'}</h5>
                </div>
                <div className="modal-body">
                    <div className='form-group mb-3'>
                        <label className='form-label'>{StudentConstants.tableHeadings[0]}</label>
                        <input
                            className='form-control'
                            value={addStudentData.rollNo}
                            onChange={(e) => handleToEditData(e.target.value, 'rollNo', true)}
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label'>{StudentConstants.tableHeadings[1]}</label>
                        <input
                            className='form-control'
                            value={addStudentData.name}
                            onChange={(e) => handleToEditData(e.target.value, 'name', true)}
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label'>{StudentConstants.tableHeadings[2]}</label>
                        <input
                            className='form-control'
                            value={addStudentData.class}
                            onChange={(e) => handleToEditData(e.target.value, 'class', true)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={addNewStudent}>{'Add student'}</button>
                    <button type="button" className="btn btn-secondary" onClick={triggerModal}>{'Close'}</button>
                </div>
            </div>
        </div>
    </div>

    const SearchAndAddStudent = <div className='row'>
        <div className='form-group ps-0 pe-5 col-10'>
            <input
                className='form-control h-100 border-0 bg-light'
                placeholder={StudentConstants.SEARCH_PLACEHOLDER}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
        <button className='col-2 btn btn-primary' onClick={triggerModal}>{'Add student'}</button>
    </div>

    const StudentTable = <div className='table-responsive'>
        <table className='table rounded mt-3 table-sm table-nowrap card-table'>
            <thead>
                <tr>{StudentConstants.tableHeadings.map(heading => <th className='text-muted p-2 text-center border-0'>{heading}</th>)}</tr>
            </thead>
            <tbody>
                {students.map(student => <tr>
                    {toEditColumn.id === student.id ? <>
                        <td className='text-center p-2'>
                            <input className='form-control' value={toEditColumn.rollNo} onChange={(e) => handleToEditData(e.target.value, 'rollNo')} />
                        </td>
                        <td className='text-center p-2'>
                            <input className='form-control' value={toEditColumn.name} onChange={(e) => handleToEditData(e.target.value, 'name')} />
                        </td>
                        <td className='text-center p-2'>
                            <input className='form-control' value={toEditColumn.class} onChange={(e) => handleToEditData(e.target.value, 'class')} />
                        </td>
                        <td valign='middle' className='text-center p-2'>
                            <button className='btn btn-success' onClick={() => saveNewData()}>{StudentConstants.SAVE}</button>
                        </td>
                    </> : <><td valign='middle' className='text-muted text-center p-2'>{student.rollNo}</td>
                        <td valign='middle' className='text-muted text-center p-2'>{student.name}</td>
                        <td valign='middle' className='text-muted text-center p-2'>{student.class}</td>
                        <td valign='middle' className='text-center p-2'>
                            <button valign='middle' className='btn btn-warning mt-2 me-2 mb-2' onClick={() => setToEditColumn(student)}>{StudentConstants.EDIT}</button>
                            <button valign='middle' className='btn btn-danger mt-2 mb-2' onClick={() => deleteStudent(student.id)}>{StudentConstants.DELETE}</button>
                        </td></>}
                </tr>)}
            </tbody>
        </table>
    </div>

    return <div className='container ps-0 pe-0 mt-5 w-50 rounded'>
        {SearchAndAddStudent}
        {StudentTable}
        {showAddStudentModal && AddStudentModal()}
    </div>

}

export default Students