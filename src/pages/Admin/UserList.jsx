import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { userService } from "@/services/userService";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAll();
      console.log("Fetched users:", response.data);
      if (response.data && !response.data.error) {
        setUsers(response.data.data || response.data);
      } else {
        setError(response.data?.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (formData.name.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);
    try {

      const response = await userService.create(formData);

      if (response.data && !response.data.error) {
        setUsers((prevUsers) => [...prevUsers, response.data.data || response.data]);
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "patient",
          phone: "",
        });
      } else {
        setError(response.data?.message || "Creating user failed");
      }
    } catch (err) {
      console.error("Creating user error:", err);
      if (err.response && err.response.data) {
        console.error("Error response data:", err.response.data);
        setError(
          err.response.data.message ||
            JSON.stringify(err.response.data) ||
            "Creating user failed"
        );
      } else {
        setError("Creating user failed. Please check the network.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//   const updateUser = async (form) => {
//     setLoading(true);
//     try {
//       const response = await userService.update(editingUser.UserID, form);
//       if (!response.error) {
//         // Update user in list
//         setUsers(
//           users.map((u) =>
//             u.UserID === editingUser.UserID ? response.data : u,
//           ),
//         );
//         setEditingUser(null);
//         setFormData({ username: "", password: "", role: "" });
//       } else {
//         setError(response.message);
//       }
//     } catch (error) {
//       setError("Updating user failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await userService.delete(userId);
//       if (!response.error) {
//         setUsers(users.filter((u) => u.UserID !== userId));
//       } else {
//         setError(response.message);
//       }
//     } catch (error) {
//       setError("Deleting user failed");
//     } finally {
//       setLoading(false);
//     }
//   };

  if (!users) {
    return <div>No User Found</div>;
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Clinic Users</h1>
      </div>

      <Card className="border-none shadow-none bg-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">
            Add receptionist, doctor, or patient
          </CardTitle>
          <CardDescription className="text-sm">
            Create a user in your clinic. They will sign in with the email and
            password you set (no registration).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="At least 3 characters"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5 flex flex-col">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 flex flex-col">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5 flex flex-col">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div className="space-y-1.5 flex flex-col">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white rounded-md px-6"
            >
              <span className="text-white">{loading ? "Adding..." : "Add"}</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-background sticky top-0">
              <TableHead>Name</TableHead>
              <TableHead className="w-25">email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell><span className={"bg-green-200 px-2 py-1 rounded-md text-green-600 font-medium"}>{user.role}</span></TableCell>
                <TableCell>{(user.phone !== null && user.phone !== "") ? user.phone : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
