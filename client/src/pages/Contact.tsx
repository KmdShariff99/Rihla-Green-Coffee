import { useState, useEffect, useRef } from "react";
import { useSearch, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
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

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "65b5079c-6714-457e-97b9-94e8c5df3a66";

export default function Contact() {
  const search = useSearch();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartedAt = useRef(Date.now());

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

  const whatsappNumber = companyInfo.whatsapp.replace(/\D/g, "");
  const whatsappMessage = "Hello Rihla Global, I would like a green coffee quote.\nProduct:\nQuantity (kg):\nDestination country:\nPackaging preference:\nCompany:\nBusiness email:\nAdditional requirements:";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  const onSubmit = async (data: Enquiry) => {
    if (Date.now() - formStartedAt.current < 3000) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          company: data.company,
          country: data.country,
          email: data.email,
          phone: data.phone || "Not provided",
          productInterest: data.productInterest || "Not specified",
          requirement: data.requirement,
          subject: `New Enquiry from ${data.name} - ${data.company}`,
          from_name: "Rihla Global Website",
        }),
      });

      const result = await response.json();
      if (!result.success) throw new Error("Failed to submit enquiry");

      toast({
        title: "Enquiry Submitted",
        description: "We'll get back to you within 24-48 hours.",
      });
      
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setLocation("/"), 1500);
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

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-primary py-20 text-primary-foreground lg:py-28" data-testid="section-contact-header">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-accent">The buyer desk</p>
          <h1 className="display-title mt-5 max-w-3xl" data-testid="text-contact-headline">Let&apos;s discuss the lot your programme needs.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/70">Share your product interest, quantity, destination, and requirements. We&apos;ll respond with the next useful detail.</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24" data-testid="section-contact-form">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_.7fr] lg:gap-16">
            <div>
              <div className="mb-8"><p className="eyebrow">Start with the essentials</p><h2 className="mt-3 font-serif text-4xl">Send a specification request.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Minimum order is 500 kg. Standard packing is 60 kg jute bags; GrainPro or hermetic liners are available on request.</p></div>
              <Card className="border-primary/15 shadow-xl shadow-primary/5">
                <CardContent className="p-6 md:p-9">
                  <h2 className="sr-only">Send an enquiry</h2>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <label className="sr-only" htmlFor="website">Website</label>
                      <input id="website" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />
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

            <div className="flex flex-col gap-6">
              <Card className="border-primary/15 bg-primary text-primary-foreground">
                <CardContent className="p-7">
                  <p className="eyebrow text-accent">Direct line</p>
                  <h3 className="mt-3 font-serif text-3xl">A real person for the next question.</h3>
                  <p className="mt-4 text-sm leading-6 text-primary-foreground/65">Prefer a faster first conversation? Use WhatsApp and include the same details from this form.</p>
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
                      <Phone className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Phone / WhatsApp
                        </p>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-[#25D366] transition-colors"
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
