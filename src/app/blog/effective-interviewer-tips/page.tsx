import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogHeader from "@/components/blogs/blog-header";
import { DMSans } from "@/fonts/font";
import interviewingImage from "@/assets/blog/blog2/effectiveInterviews.jpeg";

export default function InterviewingBlogPost() {
  return (
    <main className={`${DMSans.className} min-h-screen bg-gray-50 mt-20`}>
      <BlogHeader />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>

        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative h-64 sm:h-80 w-full bg-purple-50 p-4">
            <Image
              src={interviewingImage}
              alt="Effective Interviewing illustration"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div className="text-sm text-gray-600 font-medium">
                BY: AMIT BHETWAL
              </div>
              <div className="text-sm text-gray-600">DATE: 07-04-25</div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Makes an Effective Interviewer? Tips for Conducting
              Successful Interviews
            </h1>

            <div className="prose max-w-none text-gray-700">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Interviews are a vital part of the hiring process, helping you
                identify the best candidates for your team, whether you&apos;re
                looking for a web developer, content creator, or any other
                position. A successful interview goes beyond asking questions,
                it&apos;s about engaging candidates to gain insights into their
                skills, personality, and cultural fit within your organization.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
                Preparing for a Successful Interview
              </h2>
              <p className="text-gray-700">
                To prepare for the interview, it&apos;s crucial to have a clear
                understanding of the job role you&apos;re hiring for.
                Familiarise yourself with the responsibilities, qualifications,
                skills, and experience necessary for the position. This
                knowledge enables you to effectively identify the type of
                candidate who will not only fill the role but excel in it.
              </p>

              <p className="text-gray-700 mt-4">
                Additionally, take the time to review each candidate&apos;s
                resume, professional background, and portfolio thoroughly.
                Understanding their work can provide valuable insights into
                their skills and experience, allowing you to formulate targeted
                questions that delve deeper into their qualifications and
                contributions to your organization.
              </p>

              <p className="text-gray-700 mt-4">
                Engaging candidates with thoughtful questions is key to success
                during the interview. Utilize behavioural questions that explore
                how they tackle role-specific challenges, such as their
                experience managing complex projects and overcoming obstacles.
                Incorporate situational questions based on hypothetical
                scenarios to gauge how candidates think and react under
                pressure.
              </p>

              <p className="text-gray-700 mt-4">
                Practising active listening by maintaining eye contact and
                staying engaged demonstrates that you value their perspectives.
                Starting with casual conversation can help ease tension and
                create a comfortable atmosphere that encourages honest and open
                responses.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
                Conducting the Interview Effectively
              </h2>

              <p className="text-gray-700">
                To ensure fairness, be aware of any personal biases and
                standardize your questions so you can assess each candidate
                objectively. Effective note-taking is essential for remembering
                important details when evaluating candidates later, and clear
                communication throughout the process is paramount.
              </p>

              <p className="text-gray-700 mt-4">
                Explain the interview structure to alleviate anxiety and offer
                constructive feedback afterwards, if possible. Finally, take
                time to reflect on the interview after it concludes, using
                insights from your team to enrich your decision-making process
                and lead to better hiring outcomes.
              </p>

              <p className="text-gray-700 mt-4">
                Becoming an effective interviewer requires preparation, active
                engagement, and the ability to create a welcoming atmosphere. By
                understanding the role, asking the right questions, listening
                actively, and reflecting on your process, you can enhance the
                interview experience.
              </p>

              <p className="text-gray-700 mt-4">
                These strategies will not only help you find the right talent
                but will also contribute to building a strong and cohesive team.
                Incorporating these tips into your interviewing process will
                elevate your recruitment efforts and create a positive hiring
                experience. Whether you&apos;re an experienced interviewer or
                just getting started, these principles will guide you toward
                selecting the best candidates for your organization.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
                Conclusion: The Art and Science of Interviewing
              </h2>

              <p className="text-gray-700">
                In summary, effective interviewing is both an art and a science.
                It involves thorough preparation, meaningful engagement with
                candidates, and ongoing reflection on your interview techniques.
                By honing these skills, you&apos;ll not only improve your
                interviewing ability but also significantly contribute to your
                organization&apos;s success by attracting and retaining the
                right talent.
              </p>

              <p className="text-gray-700 mt-4">
                Remember, each interview is a learning opportunity, so embrace
                the process and continuously seek ways to enhance your approach.
                Happy interviewing.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  Recruitment
                </span>
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  HR
                </span>
                <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  Leadership
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
