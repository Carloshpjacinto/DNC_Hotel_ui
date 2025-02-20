import Button from "@/components/Button";
import ImageField from "@/components/Form/ImageField";
import TextField from "@/components/Form/TextField";
import Link from "@/components/Link";
import Pagination from "@/components/Pagination";
import Alert from "@/components/Alert";

export default function Home() {
  return (
    <section>
      pagina principal
      <Button>clique em mim</Button>
      <Button appearance="secondary">clique em mim</Button>
      <Link href="/teste">Ir para teste</Link>
      <TextField label="Nome completo" id="full_name" name="full_name" />
      <ImageField label="Selecione a foto" id="profile_picture" />
      <Pagination currentPage={98} destination="/" totalPages={100} />
      <Alert type="success">Esse é um feedback de sucesso</Alert>
      <Alert type="danger">Falha na operação, tente novamente</Alert>
    </section>
  );
}
