"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";
import { emailOptions, invoiceFY, invoiceTypes } from "@/lib/constant";
import FormSelect from "../Form/FormSelect";
import FormDate from "../Form/FormDate";

import * as React from "react";
import { Input } from "../ui/input";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES: any = [" image/*", ".pdf", ".docx"];

const FormSchema = z.object({
  fyYear: z
    .string({ required_error: "FY must be selected." })
    .refine((value) => invoiceFY.map((item) => item.value).includes(value), {
      message: "Invalid invoice FY selected.",
    }),
  invoiceType: z
    .string({ required_error: "Invoice type must be selected." })
    .refine((value) => invoiceTypes.map((item) => item.value).includes(value), {
      message: "Invalid invoice type selected.",
    }),

  billTo: z
    .string({ required_error: "Bill To must be selected." })
    .refine((value) => emailOptions.map((item) => item.value).includes(value), {
      message: "Invalid Bill to selected.",
    }),

  billFrom: z
    .string({ required_error: "Invoice From must be selected." })
    .refine((value) => emailOptions.map((item) => item.value).includes(value), {
      message: "Invalid Bill from selected.",
    }),
  date: z.string({ required_error: "date must be selected" }),
  invoiceNo: z.string({
    required_error: "Invoice no is required",
  }),
  refernceNo: z.string({
    required_error: "Refernece no is required",
  }),
  gst: z
    .string({ required_error: "Invoice From must be selected." })
    .refine((value) => emailOptions.map((item) => item.value).includes(value), {
      message: "Invalid Bill from selected.",
    }),
  invoiceAmount: z.string({
    required_error: "Invoice Amount is required",
  }),
  tax: z.string({
    required_error: "Tax is required",
    invalid_type_error: "Tax must be a number",
  }),
  taxAmount: z.string({
    required_error: "Tax Amount is required",
    invalid_type_error: "Tax Amount must be a number",
  }),
  totalAmount: z.string({
    required_error: "Total amount is required",
    invalid_type_error: "total Amount must be a number",
  }),
  invoiceImage: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "At least one file is required.",
  }),
  // .refine(
  //   (files) =>
  //     Array.from(files).every(
  //       (file) =>
  //         file instanceof File &&
  //         file.size <= MAX_FILE_SIZE &&
  //         ACCEPTED_IMAGE_TYPES.includes(file.type)
  //     ),
  //   {
  //     message: `Files must be less than ${
  //       MAX_FILE_SIZE / (1024 * 1024)
  //     }MB and of type .jpg, .jpeg, .png, .webp`,
  //   }
  // ),
});

const AddInvoice = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("this is data", data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      form.setValue("invoiceImage", files);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-wrap items-center justify-around w-full"
      >
        <FormField
          control={form.control}
          name="invoiceType"
          render={({ field }) => (
            <FormSelect
              className="max-w-xs w-full"
              field={field}
              label="Invoice Type"
              placeholder="invoice type"
              data={invoiceTypes}
            />
          )}
        />
        <FormField
          control={form.control}
          name="fyYear"
          render={({ field }) => (
            <FormSelect
              className="max-w-xs w-full"
              field={field}
              label="Invoice FY"
              placeholder="invoice FY"
              data={invoiceFY}
            />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom"
          render={({ field }) => (
            <FormSelect
              className="max-w-xs w-full"
              field={field}
              label="Bill To"
              placeholder="bill to"
              data={emailOptions}
            />
          )}
        />

        <FormField
          control={form.control}
          name="billTo"
          render={({ field }) => (
            <FormSelect
              className="max-w-xs w-full"
              field={field}
              label="Bill From"
              placeholder="bill from"
              data={emailOptions}
            />
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Invoice Date</FormLabel>
              <FormDate field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="invoiceNo"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Invoice No</FormLabel>
              <FormControl>
                <Input placeholder="Invoice no" onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="refernceNo"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Invoice No</FormLabel>
              <FormControl>
                <Input placeholder="Invoice no" onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gst"
          render={({ field }) => (
            <FormSelect
              className="max-w-xs w-full"
              field={field}
              label="GST/IGST"
              placeholder="Select GST/IGST."
              data={emailOptions}
            />
          )}
        />
        <FormField
          control={form.control}
          name="invoiceAmount"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Invoice Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Invoice Amount"
                  type="number"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Tax</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tax"
                  type="number"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxAmount"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Tax Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tax Amount"
                  type="number"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Total Amount"
                  type="number"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoiceImage"
          render={({ field }) => (
            <FormItem className="max-w-xs w-full">
              <FormLabel>Upload Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddInvoice;
