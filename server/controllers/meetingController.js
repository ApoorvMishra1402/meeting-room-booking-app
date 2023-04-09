const Meeting = require('../models/meetingModel');
const mongoose = require('mongoose');

// get all meetings

const getMeetings = async (req, res) => {
    const user_id = req.user._id;
    const meetings = await Meeting.find({user_id}).sort({ createdAt: -1 });

    res.status(200).json(meetings);
}

// get a single meeting

const getMeeting = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such meeting" })
    }

    const meeting = await Meeting.findById(id);

    if (!meeting) {
        return res.status(404).json({ error: 'No such meeting' })
    }

    res.status(200).json(meeting);
}

// create a new meeting

const createMeeting = async (req, res) => {
    const { title, date , start_time, end_time, room , description,attendees} = req.body;

    try {
        const user_id = req.user._id;
        const meeting = await Meeting.create({ title, date, start_time, end_time, room, attendees, description, user_id });
        res.status(200).json(meeting);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

// delete a meeting

const deleteMeeting = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such meeting' })
    }
    const meeting = await Meeting.findOneAndDelete({ _id: id });

    if (!meeting) {
        return res.status(400).json({ error: 'No such meeting' })
    }

    res.status(200).json(meeting)

}

// update a meeting

const updateMeeting = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such meeting' })
    }

    const meeting = await Meeting.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!meeting) {
        return res.status(400).json({ error: 'No such meeting' })
    }

    res.status(200).json(meeting)

}

module.exports = {
    getMeetings,
    getMeeting,
    createMeeting,
    deleteMeeting,
    updateMeeting
}

