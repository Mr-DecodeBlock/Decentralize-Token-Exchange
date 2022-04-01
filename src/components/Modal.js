import React, { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ open, onClose, children }) {
  return (
    <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black ${
          open ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* content */}
      <div
        className={`fixed right-0 h-full bg-white shadow-lg w-full max-w-screen-sm p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div>
          <button onClick={onClose}>Click to close modal</button>
        </div>
        {children}
      </div>
    </div>
  );
}
