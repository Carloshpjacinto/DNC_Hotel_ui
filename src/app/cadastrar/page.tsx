"use client";
import Button from "@/components/Button";
import ImageField from "@/components/Form/ImageField";
import RadioGroup from "@/components/Form/RadioGroup";
import TextField from "@/components/Form/TextField";
import Link from "@/components/Link";
import { signup } from "../api/auth/signup/route";
import PasswordFields from "./PasswordFields";
import { useFormState } from "react-dom";
import Alert from "@/components/Alert";

const initialState = { message: "" };

const CadastrarPage = () => {
  const [state, formAction] = useFormState(signup, initialState);
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      {state.message && <Alert type="danger">{state.message}</Alert>}
      <form className="w-full" action={formAction}>
        <ImageField name="avatar" label="Selecionar foto" id="avatar" />
        <TextField
          label="Digite o nome completo"
          type="text"
          id="name"
          name="name"
          className="mt-2"
          required
        />
        <TextField
          label="E-mail"
          type="email"
          id="email"
          name="email"
          className="mt-2"
          required
        />
        <PasswordFields />
        <RadioGroup
          options={[
            { label: "Sim", value: "ADMIN", id: "yes" },
            { label: "Não", value: "USER", id: "no" },
          ]}
          name="role"
          label="Você deseja anunciar hospedagens?"
          className="my-2"
        />
        <Button appearance="primary" type="submit" className="mt-2">
          Cadastrar-se
        </Button>
      </form>
      <span className="mt-2">ou</span>
      <Link href="/login" className="my-2">
        Já possuo um cadastro
      </Link>
    </section>
  );
};

export default CadastrarPage;
