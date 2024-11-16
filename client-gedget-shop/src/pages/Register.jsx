import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Register = () => {
  const { CreateUser } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = (data) => {
    CreateUser(data.email, data.password)
    navigate("/")
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm text-light">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must have at least 6 characters" } })}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm text-light">{errors.password.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "Passwords do not match";
                    }
                  }
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm text-light">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" >Register</button>
            </div>
            <div>
              <h2>
                Already Have an Account? <Link to="/login">Login</Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
