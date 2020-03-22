import cron from 'node-cron';
import query from '../util/query';
import { sgMail, messageHelper } from './email.cron';


export default function emailCron() {
  cron.schedule('45 * * * * *', async () => {
    try {
      const users = await query().answer.getAnswersNotified();
      if (users && users.question.subscribedUsers.length > 0) {
        const { subscribedUsers } = users.question;
        const email = subscribedUsers.map((item) => item.email);
        await sgMail.sendMultiple(messageHelper(email, users.question.title));
        users.notified = true;
        await users.save();
      }
    } catch (error) {
      console.error(error);
    }
    console.log('running a task every minute');
  });
}
