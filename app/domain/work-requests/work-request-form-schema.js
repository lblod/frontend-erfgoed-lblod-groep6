import { z } from 'zod';

const workRequestFormSchema = z.object({
  firstName: z.string().min(1, 'Voornaam is verplicht.'),
  lastName: z.string().min(1, 'Familienaam is verplicht.'),
  email: z.string().min(1, 'email is verplicht.'),
  telephone: z.string().min(1, 'telefoon is verplicht.'),
});

export default workRequestFormSchema;
