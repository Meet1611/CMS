import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  formData,
  setFormData,
  handleSubmit,
  loading = false,
}) {
  const email = formData.email;
  const password = formData.password;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className={cn("border border-gray-200 shadow", className)}>
        <CardHeader>
          <CardTitle className="text-2xl font-black tracking-tighter">CMS Login</CardTitle>
          <CardDescription className={cn("text-slate-500 ")}>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "text-white hover:text-black w-full",
                    className,
                  )}
                >
                  <span className={`text-white`}>{loading ? "Logging in..." : "Login"}</span>
                </Button>
                {/* <button
                  type="submit"
                  disabled={loading}
                  className={"bg-slate-900 w-full rounded-md px-2 py-1 outline"}
                >
                  <span className="text-white">{loading ? "Logging in..." : "Login"}</span>
                </button> */}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
