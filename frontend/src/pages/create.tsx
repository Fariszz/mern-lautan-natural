import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendEmailUser } from "@/api/users";
import { useToast } from "@/components/ui/use-toast";

function Create() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email_to, setEmailTo] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const { mutate: onCreate } = useSendEmailUser(
    {
      email_to: email_to,
      subject: subject,
      description: description,
      send_date: date,
    },
    {
      onSuccess: () => {
        toast({
          title: "Data berhasil ditambahkan",
        });
        navigate("/table");
      },
      onError: () => {
        toast({
          title: "Data gagal ditambahkan",
          variant: "destructive",
        });
        navigate("/table");
      },
    }
  );

  const isAllowSubmit = () => {
    if (email_to && subject && description && date) return true;

    return false;
  };

  const submitHandler = () => {
    event?.preventDefault();
    onCreate();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex w-full flex-col rounded-lg border px-4 py-6 shadow-md">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-semibold">Create</h2>
          <Link className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700" to="/table">
            Back
          </Link>
        </div>
        <form action="#">
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              id="email"
              onChange={e => setEmailTo(e.target.value)}
              placeholder="Masukkan Email Tujuan"
              required
              type="email"
              value={email_to}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium" htmlFor="date">
              Date
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              id="date"
              onChange={e => setDate(e.target.value)}
              type="date"
              value={date}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium" htmlFor="date">
              Subject
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              id="subject"
              onChange={e => setSubject(e.target.value)}
              placeholder="Masukkan Subject"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              id="description"
              onChange={e => setDescription(e.target.value)}
              placeholder="Masukkan Description"
              rows={4}
            />
          </div>
          {isAllowSubmit() ? (
            <button
              className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={submitHandler}
              type="submit"
            >
              Submit
            </button>
          ) : (
            <button
              className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Create;
