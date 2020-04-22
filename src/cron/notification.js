import { sgMail, messageHelper } from './email.cron';
import sendEmailQueue from '../config/bull.config';
import query from '../util/query';

export default async function sendEmail({ data }) {
  const questionId = data;
  try {
    const question = await query().question.notifySubscriners(questionId);
    if (question) {
      const email = question.subscribedUsers.map((item) => item.email);
      await sgMail.sendMultiple(messageHelper(email, `${question.title} have a new answer`));
    }
  } catch (error) {
    sendEmailQueue.add({ data: questionId }, { attempts: 2 });
  }
}
