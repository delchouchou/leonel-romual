import { WeddingConfigType } from "@/interfaces/config"

const weddingConfig: WeddingConfigType = {
    people: {
        bride: { firstName: 'Leonelle', lastName: '' },
        groom: { firstName: 'Romuald', lastName: '' }
    },
    date: {
        date: '2026-12-18',
        time: '09:00',
        ceremonyTime: '11h00',
        receptionTime: '19h00'
    },
    location: {
        title: 'EEC Grand Temple de Nkongsamba',
        address: 'Nkongsamba, Cameroun',
        link: 'https://www.google.com/maps/search/?api=1&query=EEC+Grand+Temple+Nkongsamba+Cameroon',
        latLng: ''
    },
    calendar: {
        location: 'Nkongsamba, Cameroun',
        details: 'Mariage de Leonelle et Romuald — cérémonies traditionnelle, civile et religieuse',
        endTime: '23:00',
    },
    rsvp: { formUrl: '' },
}

export default weddingConfig
