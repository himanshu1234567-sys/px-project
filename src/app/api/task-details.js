// pages/api/task-details.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({
        startDate: '2024-07-26T19:08:31',
        endDate: null,
        endTime: null,
        reminder: 'None'
      });
    } else if (req.method === 'POST') {
      const { startDate, endDate, reminder } = req.body;
      // Handle saving logic here
      res.status(200).json({ message: 'Saved successfully' });
    }
  }
  