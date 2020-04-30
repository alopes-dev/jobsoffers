/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import * as Yup from 'yup';

export default async function unFormValidator(
    formRef, { data, reset = () => {} },
    ImgSchema,
) {
    try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape(ImgSchema);
        await schema.validate(data, { abortEarly: false });
        reset();
        return { data, success: true };
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            const message = {};
            error.inner.forEach((err) => {
                message[err.path] = err.message;
            });
            formRef.current.setErrors(message);
            return { error, success: false };
        }
    }
}