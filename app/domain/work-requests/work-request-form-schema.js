import { z } from 'zod';

const workRequestFormSchema = z.object({
  firstName: z.string().min(1, 'Voornaam is verplicht.'),
  lastName: z.string().min(1, 'Familienaam is verplicht.'),
});

export default workRequestFormSchema;
