import React from "react";
import { CardClient } from "./client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CardClient id={id} />;
}
