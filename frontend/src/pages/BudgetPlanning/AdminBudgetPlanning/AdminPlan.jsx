import { useEffect, useState } from 'react';
import axios from '../../../api/AxiosUrl';
import ShowAdminPlans from './ShowAdminPlans';
import CreateAdminPlan from './CreateAdminPlan';

const AdminPlan = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/plan');
      console.log(res);
      if (res.data.success) {
        setCurrentPlan(res.data.plan);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && currentPlan ? <ShowAdminPlans /> : <CreateAdminPlan />}
    </div>
  );
};

export default AdminPlan;
