import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { AuthContext } from '@/app/authContext'
import { IEvent } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import EventsMaster from '@/components/eventsMaster/eventsMaster'
import { stylesSheet } from '@/styles/styles'

export default function SendInvitationModal({ invitationModal, setInvitationModal, masterId, orgId }) {
    let isFocused = useIsFocused()
    let [events, setEvents] = useState<Array<IEvent>>([])
    useEffect(() => {
        if (invitationModal) {
            axios.get(`${baseURL}/api/events?org_id=${orgId}`).then(response => setEvents(response.data));
        }
    }, [invitationModal])
    console.log('org', orgId)
    console.log('id', masterId)
    function sendInvitation(eventId) {
        axios({
            method: "post",
            url: `${baseURL}/api/invetations`,
            /* headers: {
              Authorization: `Bearer ${token}`,
            }, */
            data:
            {
                master_id: masterId,
                event_id: eventId
            }

        }).then((response) => {
            console.log(response);
        });
        setInvitationModal(false)
    }
    return (
        <View>
            <Modal
                visible={invitationModal}
                animationType="slide"
                transparent={true}
                style={{ zIndex: 10 }}
            >
                <View style={stylesSheet.container}>
                    <Text style={stylesSheet.title}>Мои события</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={events}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { sendInvitation(item.id) }}>
                                <EventsMaster item={item} />
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </Modal>
        </View>
    )
}