import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { enquirySchema, companyInfo, products, type Enquiry } from "@shared/schema";

const countries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Germany",
  "Italy",
  "France",
  "Netherlands",
  "Belgium",
  "Spain",
  "United Kingdom",
  "Japan",
  "South Korea",
  "China",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Australia",
  "United States",
  "Canada",
  "Other",
];

export default function Contact() {
  const search = useSearch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const params = new URLSearchParams(search);
  const productParam = params.get("product");

  const form = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      requirement: "",
      productInterest: productParam || "",
    },
  });

  useEffect(() => {
    if (productParam) {
      form.setValue("productInterest", productParam);
      form.setValue(
        "requirement",
        `I am interested in ${productParam}. Please provide specifications and availability.`
      );
    }
  }, [productParam, form]);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}?text=Hello, I'm interested in your green coffee products.`;

  const onSubmit = async (data: Enquiry) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit enquiry");

      setIsSubmitted(true);
      toast({
        title: "Enquiry Submitted",
        description: "We'll get back to you within 24-48 hours.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background" data-testid="contact-success">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Thank You!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your enquiry has been received. Our team will review your requirements and get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            For urgent inquiries, please reach us on{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-medium hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 md:py-16 bg-background" data-testid="section-contact-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-contact-headline">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Ready to source Indian green coffee? Get in touch with our team to discuss your requirements.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Send an Enquiry
                  </h2>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Smith"
                                  {...field}
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ABC Trading Co."
                                  {...field}
                                  data-testid="input-company"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="john@company.com"
                                  {...field}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 234 567 8900"
                                  {...field}
                                  data-testid="input-phone"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger data-testid="select-country">
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="productInterest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Interest (Optional)</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger data-testid="select-product">
                                    <SelectValue placeholder="Select a product" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {products.map((product) => (
                                    <SelectItem
                                      key={product.id}
                                      value={product.name}
                                    >
                                      {product.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="requirement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Requirement *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your coffee requirements, quantities, and any specific specifications you need..."
                                className="min-h-[120px] resize-none"
                                {...field}
                                data-testid="input-requirement"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto"
                        data-testid="button-submit-enquiry"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Enquiry
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Contact Information
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${companyInfo.email}`}
                          className="text-foreground hover:text-primary transition-colors"
                          data-testid="link-contact-email"
                        >
                          {companyInfo.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${companyInfo.phone}`}
                          className="text-foreground hover:text-primary transition-colors"
                          data-testid="link-contact-phone"
                        >
                          {companyInfo.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Location
                        </p>
                        <p className="text-foreground">{companyInfo.address}</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#25D366]/10 border-[#25D366]/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                    <h3 className="font-semibold text-foreground">
                      Quick Response on WhatsApp
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    For faster responses, chat with us directly on WhatsApp.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
                      data-testid="button-whatsapp-contact"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to enquiries within 24-48 business
                    hours. For urgent requirements, please use WhatsApp.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
