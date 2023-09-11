"use client";

import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Book = ({ book }) => {
  const router = useRouter();

  const [openModalDeleted, setOpenModalDeleted] = useState(false);

  const deleteBook = async () => {
    try {
      const response = await fetch(`/api/book/${book._id.toString()}`, {
        method: "DELETE",
      });
      if (response.status !=200) {
        alert(`Something went wrong!\n ${response.message}}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBook = async () => {
    await deleteBook(book._id);
    setOpenModalDeleted(false);
    window.location.reload();
  };

  const onClose = () => {
    setOpenModalDeleted(false);
  };

  return (
    <tr
      key={book._id}
      className="bg-white border-b dark:bg-gray-300 dark:border-gray-700 dark:text-gray-800"
    >
      <td className="px-6 py-4">{book.name}</td>
      <td className="px-6 py-4">{book.author}</td>
      <td className="px-6 py-4">{book.status}</td>
      <td className="px-6 py-4">
        <FiEdit
          onClick={() => router.push(`/update-book?id=${book._id}`)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
      </td>
      <td className="px-6 py-4">
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal isOpen={openModalDeleted}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Delete {book.name}
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete {book.name} from list?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => onClose()}>
                Cancel
              </Button>
              <Button color="danger" onPress={() => handleDeleteBook()}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </td>
    </tr>
  );
};
export default Book;
