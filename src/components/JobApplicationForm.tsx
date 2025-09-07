import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(1, "Please select a location"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(10, "Please tell us about your experience"),
});

type FormData = z.infer<typeof formSchema>;

const JobApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      position: "",
      experience: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    form.reset();
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: "Job Location", completed: currentStep > 1 },
    { number: 2, title: "Job Position", completed: currentStep > 2 },
    { number: 3, title: "Personal Details", completed: false },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-accent/10 to-tertiary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Apply for Your Dream Job
          </h2>
          <p className="text-xl text-muted-foreground">
            Join our vibrant community of music educators and creators
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-elegant p-8 border border-accent/20">
          {isSubmitted ? (
            /* Thank You Screen */
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-elegant">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Thank You for Your Application!
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                We've received your application and our team will review it carefully. 
                We'll contact you within 3-5 business days with the next steps.
              </p>
              <div className="bg-accent/10 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <p className="text-sm text-foreground">
                  <strong>What's next?</strong><br />
                  • We'll review your application<br />
                  • You may receive a follow-up call<br />
                  • We'll schedule an interview if you're selected
                </p>
              </div>
              <Button 
                onClick={resetForm}
                variant="hero"
                className="px-8"
              >
                Submit Another Application
              </Button>
            </div>
          ) : (
            <>
              {/* Progress Steps */}
              <div className="flex justify-between mb-8 relative">
            <div className="absolute top-5 left-0 w-full h-0.5 bg-muted"></div>
            <div 
              className="absolute top-5 left-0 h-0.5 bg-gradient-primary transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step.completed 
                    ? 'bg-primary text-primary-foreground shadow-vibrant' 
                    : step.number === currentStep
                    ? 'bg-gradient-primary text-white shadow-elegant'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? <CheckCircle className="w-5 h-5" /> : step.number}
                </div>
                <span className="mt-2 text-sm font-medium text-foreground">{step.title}</span>
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Location */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-accent/30 focus:border-primary">
                              <SelectValue placeholder="Select your preferred location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="london">London</SelectItem>
                            <SelectItem value="leeds">Leeds</SelectItem>
                            <SelectItem value="manchester">Manchester</SelectItem>
                            <SelectItem value="birmingham">Birmingham</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      variant="hero"
                      className="px-8"
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Position */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-accent/30 focus:border-primary">
                              <SelectValue placeholder="Select the position you're applying for" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="music-teacher">Music Teacher</SelectItem>
                            <SelectItem value="piano-instructor">Piano Instructor</SelectItem>
                            <SelectItem value="guitar-instructor">Guitar Instructor</SelectItem>
                            <SelectItem value="vocal-coach">Vocal Coach</SelectItem>
                            <SelectItem value="music-producer">Music Producer</SelectItem>
                            <SelectItem value="curriculum-developer">Curriculum Developer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      variant="outline"
                      className="px-8"
                    >
                      Previous
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      variant="hero"
                      className="px-8"
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Personal Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. John Smith" 
                              className="h-12 border-accent/30 focus:border-primary"
                              {...field} 
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
                          <FormLabel className="text-lg font-semibold">Phone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. 07991 123 456" 
                              className="h-12 border-accent/30 focus:border-primary"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            type="email"
                            className="h-12 border-accent/30 focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Tell us about your experience</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your musical background, teaching experience, and what makes you passionate about music education..."
                            className="min-h-[120px] border-accent/30 focus:border-primary resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload Section */}
                  <div className="space-y-3">
                    <label className="text-lg font-semibold text-foreground">
                      Certification <span className="text-sm font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <div className="border-2 border-dashed border-accent/40 rounded-lg p-8 text-center hover:border-primary/60 transition-colors">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">
                        <span className="text-primary underline cursor-pointer">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Upload your certifications, resume, or portfolio (PDF, DOC, JPG, PNG)
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      variant="outline"
                      className="px-8"
                    >
                      Previous
                    </Button>
                    <Button 
                      type="submit" 
                      variant="hero"
                      className="px-8"
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
          </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobApplicationForm;