import React from 'react'
import { connect } from 'react-redux'
import Checkbox from '../../common-components/Checkbox'
import { sendAllClientsData } from '../../redux'
import AllClientsData from './data.json'

const mapStateToProps = state => ({
    clientsData: state.clientsData
})

const Clients = ({
    clientsData,
    dispatch
}) => {

    const setClientsData = data => dispatch(sendAllClientsData(data))

    const checkIfNameChecked = (client, countryToSearch) => {
        const countryDataInSavedClients = clientsData.find(data => data.country === countryToSearch)
        if (countryDataInSavedClients) {
            return !!countryDataInSavedClients.clients.find(clientInData => clientInData.id === client.id)
        }
    }

    const saveClientData = (client, country) => {
        const countryDataIndex = clientsData.findIndex(data => data.country === country)
        let duplicateClientData
        if (checkIfNameChecked(client, country)) {
            duplicateClientData = [...clientsData]
            const countryClients = duplicateClientData[countryDataIndex].clients
            if (countryClients.length === 1) {
                duplicateClientData = clientsData.filter(clientData => clientData.country !== country)
            } else {
                duplicateClientData[countryDataIndex] = {
                    country,
                    clients: countryClients.filter(clientDataForCountry => clientDataForCountry.id !== client.id)
                }
            }
        } else {
            if (countryDataIndex !== -1) {
                duplicateClientData = [...clientsData]
                duplicateClientData[countryDataIndex] = {
                    country,
                    clients: [...duplicateClientData[countryDataIndex].clients, client]
                }
            } else {
                duplicateClientData = [...clientsData, {
                    country,
                    clients: [client]
                }]
            }
        }
        setClientsData(duplicateClientData)
    }

    const getNameCard = (client, country) => {
        return <div className='w-100 px-3 py-2 mt-2 d-flex bg-secondary align-items-center justify-content-between'>
            <p className='p-0 m-0 text-light'>{client.name}</p>
            <span className='close p-0 m-0 pb-1 h4' role='button' style={{ cursor: 'pointer' }} onClick={() => saveClientData(client, country)}>&times;</span>
        </div>
    }

    const CountryHeadingAndData = (withCheckbox) => {
        if (withCheckbox) {
            return <div>
                {AllClientsData.clients.map(countryData => {
                    return <div className='mb-2'>
                        <h1 className='font-weight-bold mb-2'>{countryData.country}</h1>
                        {countryData.clients.map(client => <Checkbox
                            id={`client-${client.id}`}
                            name={`${countryData.country}-client`}
                            label={client.name}
                            checked={checkIfNameChecked(client, countryData.country)}
                            onChange={() => saveClientData(client, countryData.country)}
                        />)}
                    </div>
                })}
            </div>
        } else {
            return <div>
                {AllClientsData.clients.map(countryData => {
                    const countryInSavedData = clientsData.find(clientData => clientData.country === countryData.country)
                    return !!countryInSavedData && <div className='mb-3'>
                        <h1 className='font-weight-bold mb-2'>{countryInSavedData.country}</h1>
                        {countryInSavedData.clients.map(clientData => getNameCard(clientData, countryData.country))}
                    </div>
                })}
            </div>
        }
    }


    return <div className='container d-flex justify-content-center mt-5'>
        <div className='col-6 me-5 card p-3'>
            {CountryHeadingAndData(true)}
        </div>
        <div className='col-6 card p-3'>
            {CountryHeadingAndData()}
        </div>
    </div>


}

export default connect(mapStateToProps)(Clients)
